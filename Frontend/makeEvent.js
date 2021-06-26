const form = document.getElementById('eventForm');
form.addEventListener('submit', makeEvent);

async function makeEvent(event){
    event.preventDefault();

    const eventTitle = document.getElementById('eventTitle').value;
    const description = document.getElementById('description').value;
    const postalcode = document.getElementById('postalcode').value;
    const numberofguests = document.getElementById('numberofguests').value;
    const location = document.getElementById('location').value;

    if(eventTitle.length < 5 || eventTitle.length > 255) {
        alert('Der Titel muss zwischen 5 und 255 Zeichen lang sein!');
    }
    else if(description.length < 5 || description.length > 10240) {
        alert('Die Beschreibung muss zwischen 5 und 10240 Zeichen lang sein!');
    }
    else if(postalcode.length < 4 || postalcode.length > 6) {
        alert('Bitte eine korrekte Postleitzahl eingeben!');
    }
    else if(numberofguests < 1) {
        alert('Du möchtest keine Gäste haben???');
    }
    else if(!location){
        alert('Bitte eine Location angeben!');
    }
    else {

        const toSend = JSON.stringify({
            title: eventTitle,
            description: description,
            location: location,
            postalcode: postalcode,
            numberofguests: numberofguests,
        });

        const result = await fetch('/event/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: toSend
        }).then((res) => res.json());

        if(result.status === 'ok'){
            alert('Event erfolgreich gepostet!');
            window.location.replace('http://localhost:3000/');
        }

        else{
            alert('Irgendwas lief falsch :(');
        }

        console.log(result);

    }
}