function showLoader() {
    document.getElementById('loadingOverlay').style.display = 'flex';
  }
  
  function hideLoader() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }
  


let fetchedData = {}; // Global variable to store fetched data

        function fetchReport() {
            let caseNo = document.getElementById("caseNo").value;
            if (!caseNo) {
                alert("Please enter a case number.");
                return;
            }

            showLoader();
            fetch(`https://data-collection-lrwd.onrender.com/DataCollection-api/citizenReport/${caseNo}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Invalid Case No:"+ caseNo);
                }
                return response.json();
            })
            .then(data => {
                fetchedData = data; // Store data globally for PDF generation
                let output = `
                    <h3>Report Details</h3>
                    <p><strong>Plan Name:</strong> ${data.planName || "N/A"}</p>
                    <p><strong>Plan Description:</strong> ${data.planDescription || "N/A"}</p>

                    <h4>Citizen Details</h4>
                    <p><strong>Full Name:</strong> ${data.citizeninputs?.fullName || "N/A"}</p>
                    <p><strong>Email:</strong> ${data.citizeninputs?.email || "N/A"}</p>
                    <p><strong>Gender:</strong> ${data.citizeninputs?.gender || "N/A"}</p>
                    <p><strong>Phone Number:</strong> ${data.citizeninputs?.phoneNo || "N/A"}</p>
                    <p><strong>Aadhar No:</strong> ${data.citizeninputs?.adharNo || "N/A"}</p>
                    <p><strong>Date of Birth:</strong> ${data.citizeninputs?.dob || "N/A"}</p>

                    <h4>Income Details</h4>
                    <p><strong>Employment Income:</strong> ${data.incomeinputs?.empIncome || "N/A"}</p>
                    <p><strong>Property Income:</strong> ${data.incomeinputs?.propertyIncome || "N/A"}</p>

                    <h4>Education Details</h4>
                    <p><strong>Highest Qualification:</strong> ${data.eduinputs?.highestQualification || "N/A"}</p>
                    <p><strong>Pass Out Year:</strong> ${data.eduinputs?.passOutYear || "N/A"}</p>

                    <h4>Child Details</h4>
                    <ul>
                        ${data.childdata?.length > 0 ? 
                            data.childdata.map(child => 
                                `<li><strong>Aadhar No:</strong> ${child.adharNo || "N/A"}, 
                                    <strong>Date of Birth:</strong> ${child.dob || "N/A"}</li>`).join('') 
                            : "<li>No child data available</li>"}
                    </ul>
                `;

                document.getElementById("output").innerHTML = output;
            })
            .catch(error => {
                document.getElementById("output").innerHTML = `<p class="error">${error.message}</p>`;
            })
            .finally(() => {
                hideLoader();
            });
        }

        function downloadPDF() {
    let caseNo = document.getElementById("caseNo").value;
    if (!caseNo) {
        alert("Please enter a case number.");
        return;
    }

    fetch(`https://data-collection-lrwd.onrender.com/DataCollection-api/citizenReport/${caseNo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid Case Number or No Data Found");
            }
            return response.json();
        })
        .then(data => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFont("helvetica", "bold");
            doc.text("Citizen Report", 10, 10);

            let y = 20;

            function addText(label, value) {
                doc.setFont("helvetica", "normal");
                doc.text(`${label}: ${value ? String(value) : "N/A"}`, 10, y);
                y += 10;
            }

            addText("Plan Name", data.planName);
            addText("Plan Description", data.planDescription);

            doc.setFont("helvetica", "bold");
            doc.text("Citizen Details", 10, y);
            y += 10;
            addText("Full Name", data.citizeninputs?.fullName);
            addText("Email", data.citizeninputs?.email);
            addText("Gender", data.citizeninputs?.gender);
            addText("Phone Number", data.citizeninputs?.phoneNo);
            addText("Aadhar No", data.citizeninputs?.adharNo);
            addText("Date of Birth", data.citizeninputs?.dob);

            doc.setFont("helvetica", "bold");
            doc.text("Income Details", 10, y);
            y += 10;
            addText("Employment Income", data.incomeinputs?.empIncome);
            addText("Property Income", data.incomeinputs?.propertyIncome);

            doc.setFont("helvetica", "bold");
            doc.text("Education Details", 10, y);
            y += 10;
            addText("Highest Qualification", data.eduinputs?.highestQualification);
            addText("Pass Out Year", data.eduinputs?.passOutYear);

            doc.setFont("helvetica", "bold");
            doc.text("Child Details", 10, y);
            y += 10;
            if (data.childdata?.length > 0) {
                data.childdata.forEach((child, index) => {
                    addText(`Child ${index + 1} Aadhar No`, child.adharNo);
                    addText(`Child ${index + 1} Date of Birth`, child.dob);
                });
            } else {
                addText("No child data available", "");
            }

            doc.save("Citizen_Report.pdf");
        })
        .catch(error => {
            document.getElementById("output").innerHTML = `<p class="error">${error.message}</p>`;
        });       
}
function goToNextPage() {
    window.location.href = "EligibilityCheck.html"; // Change this to your actual next page URL
}