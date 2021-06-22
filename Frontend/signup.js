/*const signup = () =>{
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
button.addEventListener('click', signup);*/

const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    const toSend = JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        password: passwordConfirm
    });

    console.log(toSend);

    const result = await fetch('/user/register', {
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: toSend
    })//.then((res) => res.json());

    console.log(result);

}