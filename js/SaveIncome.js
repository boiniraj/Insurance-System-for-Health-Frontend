function showLoader() {
    document.getElementById('loadingOverlay').style.display = 'flex';
  }
  
  function hideLoader() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }
  


document.getElementById("incomeForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    const incomeId=document.getElementById("incomeId").value;
    const caseNo = document.getElementById("caseNo").value;
    const empIncome = document.getElementById("empIncome").value;
    const propertyIncome = document.getElementById("propertyIncome").value;

    const incomeData = {
        incomeId:parseInt(incomeId),
        caseNo: parseInt(caseNo),
        empIncome: parseFloat(empIncome),
        propertyIncome: propertyIncome ? parseFloat(propertyIncome) : 0
    };

    try {
        showLoader();
        const response = await fetch("https://data-collection-7ozf.onrender.com/DataCollection-api/saveIncome", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(incomeData)
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("message").textContent = `Income saved successfully for Case No: ${data}`;
            document.getElementById("message").style.color = "green";
            setTimeout(() => {
        window.location.href = "SaveChild.html"; // Change "nextPage.html" to your target page
    }, 2000);
        } else {
            document.getElementById("message").textContent = "Error: Case number not found! && Income details already exist";
            document.getElementById("message").style.color = "red";
        }
    } catch (error) {
        document.getElementById("message").textContent = "An unexpected error occurred!";
        document.getElementById("message").style.color = "red";
    }finally {
        hideLoader();
    }
});