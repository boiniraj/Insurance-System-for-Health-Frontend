        
        function showLoader() {
            document.getElementById('loadingOverlay').style.display = 'flex';
          }
          
          function hideLoader() {
            document.getElementById('loadingOverlay').style.display = 'none';
          }
          
        
        
        
        
        document.getElementById("caseNo").textContent = localStorage.getItem("caseNo") || "N/A";
        document.getElementById("bankName").textContent = localStorage.getItem("bankName") || "N/A";
        document.getElementById("accNo").textContent = localStorage.getItem("accNo") || "N/A";
        document.getElementById("beneficiaryAmt").textContent = localStorage.getItem("beneficiaryAmt") || "N/A";

        document.getElementById("submitPayment").addEventListener("click", function () {
            let paymentData = {
                caseNo: localStorage.getItem("caseNo") ? parseInt(localStorage.getItem("caseNo")) : null,
                bankName: localStorage.getItem("bankName") || "N/A",
                accNo: localStorage.getItem("accNo") || "N/A",
                beneficiaryAmt: localStorage.getItem("beneficiaryAmt") ? parseFloat(localStorage.getItem("beneficiaryAmt")) : 0
            };

            document.getElementById("loader").style.display = "block";
            document.getElementById("submitPayment").disabled = true;

            fetch("https://payment-module-9y1r.onrender.com/Payments-api/savePayments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("paymentForm").style.display = "none";
                document.getElementById("successPage").style.display = "block";
                document.getElementById("paidAmount").textContent = paymentData.beneficiaryAmt;
                document.getElementById("transactionId").textContent = data.transactionId;
                let paymentDate = new Date(data.date + 'T00:00:00');
    document.getElementById("dateTime").textContent = paymentDate.toLocaleDateString();
                
            })
            .catch(error => {
                alert("Payment failed. Please try again.");
            })
            .finally(() => {
                document.getElementById("loader").style.display = "none";
                document.getElementById("submitPayment").disabled = false;
            });
        });

        function goHome() {
            window.location.href = "index.html";
        }