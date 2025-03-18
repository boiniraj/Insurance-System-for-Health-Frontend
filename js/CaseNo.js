const BASE_URL = "http://localhost:7071/DataCollection-api";

        async function generateCaseNo() {
            let appId = document.getElementById('appId').value;
            let response = await fetch(`${BASE_URL}/generateCaseNo/${appId}`, { method: 'POST' });

            if (!response.ok) {
                alert('Application Id Not Valid Or already registered with Case No:'+ appId);
                return;
            }

            let caseNo = await response.text();
            document.getElementById('caseNo').innerHTML="Your CaseNo::"+caseNo;
            alert('Generated Case No: ' + caseNo);
            setTimeout(() => {
                window.location.href = "PlanSelection.html"; // Change "nextPage.html" to your actual page
            }, 5000);
        }