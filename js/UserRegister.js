
        function registerCitizen() {
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const gender = document.getElementById('gender').value;
            const phoneNo = document.getElementById('phoneNo').value.trim();
            const adharNo = document.getElementById('adharNo').value.trim();
            const accountNo = document.getElementById('accountNo').value.trim();
            const bankName = document.getElementById('bankName').value;
            const stateName = document.getElementById('stateName').value;
            const dob = document.getElementById('dob').value;

            const fullNameError = document.getElementById('fullNameError');
            const adharNoError = document.getElementById('adharNoError');
            const emailError = document.getElementById('emailError');
            const phoneNoError = document.getElementById('phoneNoError');

    // Clear previous errors
    fullNameError.textContent = "";
    adharNoError.textContent = "";
    emailError.textContent = "";
    phoneNoError.textContent = "";

    let isValid = true;


    if (!/^[A-Za-z\s]+$/.test(fullName)) {
        fullNameError.textContent = "Full Name must contain only alphabets.";
        fullNameError.style.color = "red";
        isValid = false;
    }


        // Validate Aadhar Number (12 digits)
    if (!/^\d{12}$/.test(adharNo)) {
        adharNoError.textContent = "Aadhar No must be exactly 12 digits.";
        adharNoError.style.color = "red";
        isValid = false;
    }

    // Validate Email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.color = "red";
        isValid = false;
    }

    // Validate Phone Number - Must be exactly 10 digits
       
    // Validate Phone Number (10 digits)
    if (!/^\d{10}$/.test(phoneNo)) {
        phoneNoError.textContent = "Phone number must be exactly 10 digits.";
        phoneNoError.style.color = "red";
        isValid = false;
    }

    // Stop form submission if there are validation errors
    if (!isValid) return;

               
            if (!fullName || !email || !phoneNo || !adharNo || !accountNo || !bankName || !stateName || !dob) {
                registerResponse.style.color = 'red';
                registerResponse.textContent = "Please fill in all required fields.";
                return;
            }




            const requestData = {
                fullName,
                email,
                gender,
                phoneNo: Number(phoneNo),
                adharNo: Number(adharNo),
                accountNo: Number(accountNo),
                bankName,
                stateName,
                dob
            };

            fetch('http://localhost:6061/citizen-api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then(data =>
            { 
              if(data.error)
            {
               document.getElementById("emailError").innerText="Email already registered";
               document.getElementById("emailError").style.color="red";   

            } else{ 
                
                
                document.getElementById('registerResponse').innerText = "Register Successfully Completed";
                setTimeout(() => {
            window.location.href = 'caseNo.html'; // Change the URL as needed
             }, 2000);
            }
            
    })
    
            .catch(error => 

                

            console.error('Error:', error));
        }
        

        
    