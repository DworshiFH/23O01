function register(){
    const getEmail = document.getElementById("login").nodeValue;
    const getPassword = document.getElementById("password").nodeValue;
    const getPasswordConfirm = document.getElementById("passwordconfirm").nodeValue;
    const getFirstName = document.getElementById("firstname").nodeValue;
    const getLastName = document.getElementById("lastname").nodeValue;

    console.log(getEmail);
    console.log(getPassword);

    const toSend = {
        email: getEmail,
        password: getPassword,
        passwordconfirm: getPasswordConfirm,
        firstname: getFirstName,
        lastname: getLastName
    };

    const jsonToSend = JSON.stringify(toSend);

    return jsonToSend;
}