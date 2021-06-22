const signup = () =>{
    const postURL = 'http://localhost:3000/user/register';
    const form = document.getElementById(form);
    console.log(form);
    console.log("hello");

    fetch(postURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        })

    })
    .then(() => {
        alert('Successfully signed up!');
    });
}

const button = document.getElementById('signUp');
button.addEventListener('click', signup);