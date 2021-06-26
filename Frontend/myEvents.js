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

    class MyEvent{
        constructor(eventID ,eventTitle, eventDesc, eventLocation, eventPostalCode, eventNumberOfGuests) {
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
                let myEvent = new MyEvent;

                let requestURL = "http://localhost:3000/userevents/";
                let request = new XMLHttpRequest();
                request.open("GET", requestURL);
                request.responseType = "json";
                request.send();

                console.log(request.response);

                request.onload = function () {
                    let JSONEventArray = request.response;
                    console.log(request.response);
                    console.log(JSONEventArray);

                    for(var i = 0; i < JSONEventArray.length; i++) {
                        var JSONevent = JSONEventArray[i];
                        myEvent.eventID = JSONevent["_id"];
                        myEvent.eventTitle = JSONevent["title"]; //string
                        myEvent.eventDesc = JSONevent["description"];
                        myEvent.eventLocation = JSONevent["location"];
                        myEvent.eventPostalCode = JSONevent["postalcode"];
                        myEvent.eventNumberOfGuests = JSONevent["numberofguests"];

                        console.log(myEvent);

                        myEventsScreen.addEventToScreen(myEvent);
                    }
                }
            }
            loadEvents();
        }

        deleteEvent(myEvent) {
            let requestURL = "http://localhost:3000/event/" + myEvent.eventID.toString();
            let request = new XMLHttpRequest();
            request.open("DELETE", requestURL);
            request.responseType = "json";
            request.send();
            location.reload();
        }

        addEventToScreen(myEvent) {
            this.form = document.createElement("form");

            //header
            this.header = document.createElement("h2");
            this.header.textContent = myEvent.eventTitle;
            this.form.appendChild(this.header);

            //FORM
            //eventTitle
            this.eventTitle = document.createElement("label");
            this.eventTitleInput = document.createElement("input");
            this.eventTitleInput.type="text";
            this.eventTitleInput.id="eventTitle_"+myEvent.eventID;
            this.eventTitleInput.placeholder="Titel";
            this.eventTitleInput.name="eventTitle";
            this.eventTitleInput.required = true;
            this.eventTitleInput.value = myEvent.eventTitle;
            this.eventTitle.appendChild(this.eventTitleInput);
            this.form.appendChild(this.eventTitle);
            this.form.appendChild(document.createElement("br"));
            //location
            this.location = document.createElement("label");
            this.locationInput = document.createElement("input");
            this.locationInput.type="text";
            this.locationInput.id="location_" + myEvent.eventID;
            this.locationInput.placeholder = "Location";
            this.locationInput.name = "location";
            this.locationInput.required = true;
            this.locationInput.value = myEvent.eventLocation;
            this.location.appendChild(this.locationInput);
            this.form.appendChild(this.location);
            this.form.appendChild(document.createElement("br"));
            //postalcode
            this.postalcode = document.createElement("label");
            this.postalcodeInput = document.createElement("input");
            this.postalcodeInput.type="number";
            this.postalcodeInput.id="postalcode_" + myEvent.eventID;
            this.postalcodeInput.placeholder = "Postleitzahl";
            this.postalcodeInput.name = "postalcode";
            this.postalcodeInput.required = true;
            this.postalcodeInput.value = myEvent.eventPostalCode;
            this.postalcode.appendChild(this.postalcodeInput);
            this.form.appendChild(this.postalcode);
            this.form.appendChild(document.createElement("br"));
            //numberOfGuests
            this.numberOfGuests = document.createElement("label");
            this.numberOfGuestsInput = document.createElement("input");
            this.numberOfGuestsInput.type="number";
            this.numberOfGuestsInput.id="numberofguests_" + myEvent.eventID;
            this.numberOfGuestsInput.placeholder = "Gaesteanzahl";
            this.numberOfGuestsInput.name = "numberofguests";
            this.numberOfGuestsInput.required = true;
            this.numberOfGuestsInput.value = myEvent.eventNumberOfGuests;
            this.numberOfGuests.appendChild(this.numberOfGuestsInput);
            this.form.appendChild(this.numberOfGuests);
            //description
            this.description = document.createElement("label");
            this.descriptionInput = document.createElement("textarea");
            this.descriptionInput.rows = 8;
            this.descriptionInput.id="description_" + myEvent.eventID;
            this.descriptionInput.placeholder = "Beschreibe dein Event!";
            this.descriptionInput.value = myEvent.eventDesc;
            this.description.appendChild(this.descriptionInput);
            this.form.appendChild(this.description);
            this.form.appendChild(document.createElement("br"));
            //update Button
            this.updateButton = document.createElement("input");
            this.updateButton.id = "updateEvent_" + myEvent.eventID;
            this.updateButton.type = "submit";
            this.updateButton.value = "Event Aktualisieren."
            this.deleteButton.onclick = event => {
                updateEvent(myEvent);
            }
            this.form.appendChild(this.updateButton);
            this.form.appendChild(document.createElement("br"));
            //delete Button
            this.deleteButton = document.createElement("input");
            this.descriptionInput.id = "deleteEvent_" + myEvent.eventID;
            this.deleteButton.type = "submit";
            this.deleteButton.value = "Event Löschen :(";
            this.deleteButton.onclick = event => {
                myEventsScreen.deleteEvent(myEvent);
            }
            this.form.appendChild(this.deleteButton);
            this.form.appendChild(document.createElement("br"));

            this.eventsScreen.appendChild(this.form);
        }
    }

    const myEventsScreen = new MyEventsScreen();
});

async function updateEvent(myEvent) {
    myEvent.preventDefault();

    const updateTitle = document.getElementById("eventTitle_60d5f819b8bb7b57e4bdf38f" + myEvent.eventID).value;
    const updateLocation = document.getElementById("location_60d5f819b8bb7b57e4bdf38f" + myEvent.eventID).value;
    const updatePostalCode = document.getElementById("postalcode_60d5f819b8bb7b57e4bdf38f" + myEvent.eventID).value;
    const updateNumberOfGuests = document.getElementById("numberofguests_60d5f819b8bb7b57e4bdf38f" + myEvent.eventID).value;
    const updateDescription = document.getElementById("description_60d5f819b8bb7b57e4bdf38f" + myEvent.eventID).value;

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