
function showLoader() {
    document.getElementById('loadingOverlay').style.display = 'flex';
  }
  
  function hideLoader() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }
  

const BASE_URL = "https://data-collection-lrwd.onrender.com/DataCollection-api";

        async function generateCaseNo() {

            showLoader();
            try{
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
        }catch (error) {
            console.error('Error generating case number:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            hideLoader(); // Always hide the loader, even on error
        }
        }
