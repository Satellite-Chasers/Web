const sendData = document.getElementById("sendData")
const captchaSubmit = document.getElementById("captchaSubmit")


// SEND BUTTON LISTENER
document.addEventListener('DOMContentLoaded', function () {
    sendData.addEventListener('click', async function () {
        const phoneNumber = document.getElementById('phoneInput').value.replace(/[^0-9]/g,"")
        const zipCode = document.getElementById('zipCode').value
        const button = document.getElementById('sendData')

        console.log('This is the number and zip', phoneNumber, zipCode)

        document.getElementById('errormsg').innerHTML = ""
        document.getElementById('phoneInput').disabled = true
        document.getElementById('zipCode').disabled = true
        button.disabled = true
        button.innerHTML = "LOADING"



        const response = await fetch('http://localhost:3000/sendPhoneAndZip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber: phoneNumber, zipCode: zipCode })
        })

        console.log('data sent succesfully')
        if (response.status > 201) {
            button.disabled = false
            document.getElementById('phoneInput').disabled = false
            document.getElementById('zipCode').disabled = false
            document.getElementById('errormsg').innerHTML = await response.text()
            button.innerHTML = "Try Again"
        }

        else {
            button.innerHTML = "Successfully sent you a text"
        }
    })
})

// FORMAT PHONE NUMBER LISTENER
document.getElementById('phoneInput').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});


document.addEventListener('DOMContentLoaded', function () {
    captchaSubmit.addEventListener('click', async function (e) {
        e.preventDefault()
        return
        console.log("Sent Captcha")

        const form = document.querySelector('form')
        const formData = new FormData(form)

        // Convert FormData to JSON, assuming the form only has the reCAPTCHA response
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });

        try {
            const response = await fetch('http://localhost:3000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonObject)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                // Handle success - maybe update UI or redirect
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            // Handle errors - maybe show user feedback
        }



        // const captchaResponse = grecaptcha.getResponse()
        // if (captchaResponse.length > 0) {
        //     throw new Error("Captcha not complete")
        // }



        // const fd = new FormData(e.target);
        // const params = new URLSearchParams(fd);

        // fetch('http://localhost:3000/submit-form', {
        //     method:
        //         "POST",
        //     body: params,
        // })
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        //     .catch(err => console.error(err)
        //     )



    })
})