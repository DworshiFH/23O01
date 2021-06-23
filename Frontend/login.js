const form = document.getElementById('signup-form');
form.addEventListener('submit', signInUser);

async function signInUser(event){
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!email.includes('@') || !email.includes('.') || email.length < 5) {
        alert('Please provide a valid email!');
    }
    else if(password.length < 6){
        alert('Your password is too short!');
    }
    else{
        const toSend = JSON.stringify({
            email: email,
            password: password,
        });

        const result = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: toSend
        }).then((res) => res.json());

        if(result.status === 'ok'){
            localStorage.setItem('token', result.data);
            alert('Succesfully logged in!');
            window.location.replace('http://localhost:3000/');
        }

        else{
            alert('Wrong Username or Password:(');
        }
    }
}