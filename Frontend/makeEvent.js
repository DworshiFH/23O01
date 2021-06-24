const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault();

    const eventTitle = document.getElementById('eventTitle').value;
    const description = document.getElementById('description').value;
    const postalcode = document.getElementById('postalcode').value;
    const numberofguests = document.getElementById('numberofguests').value;

    if(eventTitle.length < 5 || eventTitle.length > 255) {
        alert('Der Titel muss zwischen 5 und 255 Zeichen lang sein!');
    }
    else if(description.length < 5 || description.length > 10240) {
        alert('Die Beschreibung muss zwischen 5 und 10240 Zeichen lang sein!');
    }
    else if(postalcode.length < 5) {
        alert('Bitte eine korrekte Postleitzahl eingeben!');
    }
    else if(numberofguests < 1) {
        alert('Du möchtest keine Gäste haben???');
    }
    else {

        const toSend = JSON.stringify({
            eventTitle: title,
            description: description,
            postalcode: postalcode,
            numberofguests: numberofguests,
        });

        const result = await fetch('/event/post', { //TODO BICKDICKRICHARD gib mir deine fette URL für Events
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: toSend
        })

        if(result.ok === true){
            alert('Event erfolgreich gepostet!');
            window.location.replace('http://localhost:3000/');
        }

        else{
            alert('Irgendwas lief falsch :(');
        }

        console.log(result);

    }

}