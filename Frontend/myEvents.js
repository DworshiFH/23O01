document.addEventListener("DOMContentLoaded", function (event) {
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    const userID = getCookie('id');
    let FE_ID = 0;

    class Event{
        constructor(eventID ,eventTitle, eventDesc, eventLocation, eventPostalCode, eventNumberOfGuests) {
            FE_ID++;
            this.FE_ID = FE_ID;
            this.eventID = eventID;
            this.eventTitle = eventTitle; //string
            this.eventDesc = eventDesc; //string
            this.eventLocation = eventLocation; //string
            this.eventPostalCode = eventPostalCode; //int
            this.eventNumberOfGuests = eventNumberOfGuests; //int
            //this.eventPostingDate = null;
        }
    }

    class MyEventsScreen {
        constructor() {
            this.eventsScreen = document.getElementById("myEventsScreen");

            let loadEvents = function () {
                let event = new Event;

                let requestURL = "http://localhost:3000/myevents/";
                let request = new XMLHttpRequest();
                request.open("GET", requestURL);
                request.responseType = "json";
                request.send();

                request.onload = function () {
                    let JSONEvent = request.response;

                    event.eventID = JSONEvent["_id"];
                    event.eventTitle = JSONEvent["title"]; //string
                    event.eventDesc = JSONEvent["description"];
                    event.eventLocation = JSONEvent["location"];
                    event.eventPostalCode = JSONEvent["postalcode"];
                    event.eventNumberOfGuests = JSONEvent["numberofguests"];

                    myEventsScreen.addEventToScreen(event);
                }
            }
        }

        deleteEvent(event) {
            let requestURL = "http://localhost:3000/event/" + event.eventID.toString(); //TODO Richard: URL
            let request = new XMLHttpRequest();
            request.open("DELETE", requestURL);
            request.responseType = "json";
            request.send();
            location.reload();
        }

        addEventToScreen(event) {
            this.form = document.createElement("form");

            //header
            this.header = document.createElement("h2");
            this.header.textContent = event.eventTitle;
            this.form.appendChild(this.header);

            //FORM
            //eventTitle
            this.eventTitle = document.createElement("label");
            this.eventTitleInput = document.createElement("input");
            this.eventTitleInput.type="text";
            this.eventTitleInput.id="eventTitle_"+event.eventID;
            this.eventTitleInput.placeholder="Titel";
            this.eventTitleInput.name="eventTitle";
            this.eventTitleInput.required = true;
            this.eventTitleInput.value = event.eventTitle;
            this.eventTitle.appendChild(this.eventTitleInput);
            this.form.appendChild(this.eventTitle);
            this.form.appendChild(document.createElement("br"));
            //location
            this.location = document.createElement("label");
            this.locationInput = document.createElement("input");
            this.locationInput.type="text";
            this.locationInput.id="location_" + event.eventID;
            this.locationInput.placeholder = "Location";
            this.locationInput.name = "location";
            this.locationInput.required = true;
            this.locationInput.value = event.location;
            this.location.appendChild(this.locationInput);
            this.form.appendChild(this.location);
            this.form.appendChild(document.createElement("br"));
            //postalcode
            this.postalcode = document.createElement("label");
            this.postalcodeInput = document.createElement("input");
            this.postalcodeInput.type="number";
            this.postalcodeInput.id="postalcode_" + event.eventID;
            this.postalcodeInput.placeholder = "Postleitzahl";
            this.postalcodeInput.name = "postalcode";
            this.postalcodeInput.required = true;
            this.postalcodeInput.value = event.postalcode;
            this.postalcode.appendChild(this.postalcodeInput);
            this.form.appendChild(this.postalcode);
            this.form.appendChild(document.createElement("br"));
            //numberOfGuests
            this.numberOfGuests = document.createElement("label");
            this.numberOfGuestsInput = document.createElement("input");
            this.numberOfGuestsInput.type="number";
            this.numberOfGuestsInput.id="numberofguests_" + event.eventID;
            this.numberOfGuestsInput.placeholder = "Gaesteanzahl";
            this.numberOfGuestsInput.name = "numberofguests";
            this.numberOfGuestsInput.required = true;
            this.numberOfGuestsInput.value = event.eventNumberOfGuests;
            this.numberOfGuests.appendChild(this.numberOfGuestsInput);
            this.form.appendChild(this.numberOfGuests);
            //description
            this.description = document.createElement("label");
            this.descriptionInput = document.createElement("textarea");
            this.descriptionInput.rows = 8;
            this.descriptionInput.id="description_" + event.eventID;
            this.descriptionInput.placeholder = "Beschreibe dein Event!";
            this.descriptionInput.value = event.eventDesc;
            this.description.appendChild(this.descriptionInput);
            this.form.appendChild(this.description);
            this.form.appendChild(document.createElement("br"));
            //update Button
            this.updateButton = document.createElement("input");
            this.updateButton.id = "updateEvent_" + event.eventID;
            this.updateButton.type = "submit";
            this.updateButton.value = "Event Aktualisieren."
            this.updateButton.onclick = event => {
                updateEvent(event);
            }
            this.form.appendChild(this.updateButton);
            this.form.appendChild(document.createElement("br"));
            //delete Button
            this.deleteButton = document.createElement("input");
            this.descriptionInput.id = "deleteEvent_" + event.eventID;
            this.deleteButton.type = "delete";
            this.deleteButton.value = "Event Löschen :(";
            this.deleteButton.onclick = event => {
                myEventsScreen.deleteEvent(event);
            }
            this.form.appendChild(this.deleteButton);
            this.form.appendChild(document.createElement("br"));

            this.eventsScreen.appendChild(this.form);
        }
    }

    const myEventsScreen = new MyEventsScreen();
});

async function updateEvent(event) {
    event.preventDefault();

    const updateTitle = document.getElementById("eventTitle_" + event.eventID).value;
    const updateLocation = document.getElementById("location_" + event.eventLocation).value;
    const updatePostalCode = document.getElementById("postalcode_" + event.eventPostalCode).value;
    const updateNumberOfGuests = document.getElementById("numberofguests_" + event.eventID).value;
    const updateDescription = document.getElementById("description_" + event.eventID).value;

    if (updateTitle.length < 5 || updateTitle.length > 255) {
        alert('Der Titel muss zwischen 5 und 255 Zeichen lang sein!');
    } else if (updateDescription.length < 5 || updateDescription.length > 10240) {
        alert('Die Beschreibung muss zwischen 5 und 10240 Zeichen lang sein!');
    } else if (updatePostalCode.length < 4 || updatePostalCode.length > 6) {
        alert('Bitte eine korrekte Postleitzahl eingeben!');
    } else if (updateNumberOfGuests < 1) {
        alert('Du möchtest keine Gäste haben???');
    } else if (!updateLocation) {
        alert('Bitte eine Location angeben!');
    } else {

        const toSend = JSON.stringify({
            title: updateTitle,
            description: updateDescription,
            location: updateLocation,
            postalcode: updatePostalCode,
            numberofguests: updateNumberOfGuests,
            user: id
        });

        const result = await fetch('/event/put', { //TODO Richard: URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: toSend
        }).then((res) => res.json());

        if (result.status === 'ok') {
            alert('Event erfolgreich aktualisiert!');
            window.location.replace('http://localhost:3000/myevents');
        } else {
            alert('Irgendwas lief falsch :(');
        }
    }
}