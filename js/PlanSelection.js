function showLoader() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    fetchPlanDetails();
    fetchPlans();
});

function fetchPlanDetails() {
    showLoader();
    fetch('https://data-collection-7ozf.onrender.com/DataCollection-api/plans-data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('planTableBody');
            tableBody.innerHTML = "";

            data.forEach(plan => {
                const row = `<tr>
                    <td>${plan.planId}</td>
                    <td>${plan.planName}</td>
                    <td>${plan.planDescription}</td>
                    <td>${plan.startDate}</td>
                    <td>${plan.endDate}</td>
                    <td>${plan.activeSw ? "Active" : "Inactive"}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching plan data:', error))
        .finally(() => hideLoader());
}

function fetchPlans() {
    showLoader();
    fetch("https://data-collection-7ozf.onrender.com/DataCollection-api/plans-data")
        .then(response => response.json())
        .then(data => {
            let planDropdown = document.getElementById("plan");
            data.forEach(plan => {
                let option = document.createElement("option");
                option.value = plan.planId;
                option.textContent = plan.planName;
                planDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching plans:", error))
        .finally(() => hideLoader());
}

function savePlan() {
    let caseNo = document.getElementById("caseNo").value;
    let selectedPlanId = document.getElementById("plan").value;

    if (!caseNo) {
        document.getElementById("message").textContent = "Please enter a Case Number!";
        return;
    }

    if (!selectedPlanId) {
        document.getElementById("message").textContent = "Please select a plan!";
        return;
    }

    let requestData = {
        caseNo: parseInt(caseNo),
        planId: parseInt(selectedPlanId)
    };

    showLoader();

    fetch("https://data-collection-7ozf.onrender.com/DataCollection-api/savePlan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(result => {
        if (result > 0) {
            document.getElementById("message").textContent = "Plan saved successfully!";
            setTimeout(() => {
                window.location.href = "SaveIncome.html";
            }, 3000);
        } else {
            document.getElementById("message").textContent = "Failed to save plan.";
        }
    })
    .catch(error => {
        console.error("Error saving plan:", error);
        document.getElementById("message").textContent = "An error occurred.";
    })
    .finally(() => hideLoader());
}
