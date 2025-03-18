document.getElementById("caseNo").textContent = localStorage.getItem("caseNo") || "N/A";
        document.getElementById("bankName").textContent = localStorage.getItem("bankName") || "N/A";
        document.getElementById("accNo").textContent = localStorage.getItem("accNo") || "N/A";
        document.getElementById("benficiaryAmt").textContent = localStorage.getItem("benficiaryAmt") || "N/A";

        document.getElementById("submitPayment").addEventListener("click", function () {
            let paymentData = {
                caseNo: localStorage.getItem("caseNo") ? parseInt(localStorage.getItem("caseNo")) : null,
                bankName: localStorage.getItem("bankName") || "N/A",
                accNo: localStorage.getItem("accNo") || "N/A",
                benficiaryAmt: localStorage.getItem("benficiaryAmt") ? parseFloat(localStorage.getItem("benficiaryAmt")) : 0
            };

            document.getElementById("loader").style.display = "block";
            document.getElementById("submitPayment").disabled = true;

            fetch("http://localhost:7078/Payments-api/savePayments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("paymentForm").style.display = "none";
                document.getElementById("successPage").style.display = "block";
                document.getElementById("paidAmount").textContent = paymentData.benficiaryAmt;
                document.getElementById("transactionId").textContent = data.transactionId;
                let paymentDate = new Date(data.paymentDate);
    document.getElementById("dateTime").textContent = paymentDate.toLocaleString();
                
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