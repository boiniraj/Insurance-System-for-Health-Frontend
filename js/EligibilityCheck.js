
function showLoader() {
    document.getElementById('loadingOverlay').style.display = 'flex';
  }
  
  function hideLoader() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }
  

function checkEligibility() {
    let caseNo = document.getElementById("caseNo").value;
    let resultDiv = document.getElementById("result");

    if (!caseNo) {
        resultDiv.innerHTML = "<p class='error'>Please enter a Case Number.</p>";
        return;
    }

    showLoader();

    fetch(`https://elgibilty-determation.onrender.com/elgibility-api/citizenElgibility/${caseNo}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Invalid Case Number or No Data Found");
        }
        return response.json();
    })
    .then(data => {
        let isMissingData = 
        (!data.bankName || data.bankName === "N/A") || 
        (!data.accNo || data.accNo === "N/A") || 
        (!data.planStatus || data.planStatus === "Denied") || 
        (!data.beneficiaryAmt || data.beneficiaryAmt === "N/A");

        resultDiv.innerHTML = `
            <h3>Eligibility Details</h3>
            <p><strong>Holder Name:</strong> ${data.holderName || "N/A"}</p>
            <p><strong>Plan Name:</strong> ${data.planName || "N/A"}</p>
            <p><strong>Plan Status:</strong> ${data.planStatus}</p>
            <p><strong>Beneficiary Amount:</strong> ${data.beneficiaryAmt || "N/A"}</p>
            <p><strong>Denial Reason:</strong> ${data.denialReason || "N/A"}</p>
            <p><strong>Start Date:</strong> ${data.startDate || "N/A"}</p>
            <p><strong>End Date:</strong> ${data.endDate || "N/A"}</p>
            <p><strong>Bank Name:</strong> ${data.bankName || "N/A"}</p>
            <p><strong>Account No:</strong> ${data.accNo || "N/A"}</p>
        `;

        if (isMissingData) {
            resultDiv.innerHTML += `<button onclick="exitApplication()" style="background: red;">You are NOT eligible. Please exit.</button>`;
        } else {

            localStorage.setItem("caseNo",data.caseNo);
            localStorage.setItem("bankName", data.bankName);
            localStorage.setItem("accNo", data.accNo);
            localStorage.setItem("beneficiaryAmt", data.beneficiaryAmt);
            resultDiv.innerHTML += `<button onclick="redirectToNextPage()">Next</button>`;

        }
    })
    .catch(error => {
        resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    })
    .finally(() => {
        hideLoader();
    });
}

function exitApplication() {
    alert("Exiting the application. Please check the details.");
    window.location.href = "index.html";  // Redirect to an exit page or homepage
}

function redirectToNextPage() {
    window.location.href = "PaymentsPage.html";  // Replace with your actual next page URL
}