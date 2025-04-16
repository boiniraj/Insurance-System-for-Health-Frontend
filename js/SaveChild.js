
function showLoader() {
    document.getElementById('loadingOverlay').style.display = 'flex';
  }
  
  function hideLoader() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }
  


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("childForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        let caseNo = document.getElementById("caseNo").value.trim();
        let dob = document.getElementById("dob").value.trim();
        let aadharNo = document.getElementById("adharNo").value.trim();
        let messageDiv = document.getElementById("message");
        let nextButton = document.getElementById("nextButton");

        // Validate input fields
        if (!caseNo || !dob || !aadharNo) {
            messageDiv.innerText = "❌ Error: All fields are required.";
            messageDiv.style.color = "red";
            return;
        }

        // Validate Aadhar Number (should be exactly 12 digits)
        if (!/^\d{12}$/.test(aadharNo)) {
            messageDiv.innerText = "❌ Error: Invalid Aadhar Number (must be 12 digits).";
            messageDiv.style.color = "red";
            return;
        }

        // Prepare data object
        let childData = {
            caseNo: parseInt(caseNo, 10),
            dob: dob,
            adharNo: aadharNo
        };

        try {
            showLoader();
            const response = await fetch("https://data-collection-lrwd.onrender.com/DataCollection-api/saveChild", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(childData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "An error occurred.");
            }
            

            messageDiv.innerText = "✅ Child registered successfully! Case No: " + data;
            messageDiv.style.color = "green";
            document.getElementById("childForm").reset();
            nextButton.style.display = "block";
        } catch (error) {
            console.error("Error:", error);
            messageDiv.innerText = "❌ Error: " + error.message;
            messageDiv.style.color = "red";
        }finally {
            hideLoader(); // Always hide loader regardless of success or error
        }
    });


        document.getElementById("nextButton").addEventListener("click", function () {
        window.location.href = "SaveEducation.html"; // Change this to your actual next page
    });
});