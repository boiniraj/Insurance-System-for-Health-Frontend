function showLoader() {
    document.getElementById('loadingOverlay').style.display = 'flex';
  }
  
  function hideLoader() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }
  


document.getElementById("educationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let educationId = document.getElementById("educationId").value;
    let caseNo = document.getElementById("caseNo").value;
    let qualification = document.getElementById("qualification").value;
    let passOutYear = document.getElementById("passOutYear").value;

    if (passOutYear < 2000 || passOutYear > 2025) {
        document.getElementById("message").innerText = "Passout Year must be between 2000 and 2025.";
        document.getElementById("message").style.color = "red";
        event.preventDefault(); // Prevent form submission
        return;
    }

    let educationData = {
        educationId: parseInt(educationId),
        caseNo: parseInt(caseNo),
        highestQualification: qualification,
        passOutYear: parseInt(passOutYear)
    };
    showLoader();

    fetch("https://data-collection-7ozf.onrender.com/DataCollection-api/saveEducation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(educationData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("message").innerText = "Error: " + ( "Case No already exists or Invalid Case No");
            document.getElementById("message").style.color = "red";
        } else {
            document.getElementById("message").innerText = "Education details saved successfully!";
            document.getElementById("message").style.color = "green";
            setTimeout(() => {
                window.location.href = "ShowAllDataWithCaseNo.html"; // Change "nextPage.html" to your target page
            }, 2000);
        }
    })
    .catch(error => {
        document.getElementById("message").innerText = "Error: " + error.message;
        document.getElementById("message").style.color = "red";
    })
    .finally(() => {
        hideLoader(); // Always hide loader after fetch completes
    });
});