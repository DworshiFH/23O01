const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    if(firstName.length < 2 || firstName.length > 255) {
        alert('The length of your firstname must be between 2 and 255 characters!');
    }
    else if(lastName.length < 2 || lastName.length > 255) {
        alert('The length of your lastname must be between 2 and 255 characters!');
    }
    else if(!email.includes('@') || !email.includes('.') || email.length < 5) {
        alert('Please provide a valid email!');
    }
    else if(password !== passwordConfirm) {
        alert('Your passwords don\'t match!');
    }
    else {

        const toSend = JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            password: passwordConfirm
        });

        const result = await fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: toSend
        })

        if(result.ok === true){
            alert('Succesfully signed up!');
            window.location.replace('http://localhost:3000/');
        }

        else{
            alert('Something went wrong:(');
        }

        console.log(result);

    }

}