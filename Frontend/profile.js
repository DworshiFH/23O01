document.addEventListener("DOMContentLoaded", function (event) {



    class User{
        constructor(firstname, lastname, email, userID) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.userID = userID;
        }
    }
    class Event{
        constructor(eventTitle, userID) {
            this.eventTitle = eventTitle;
            this.userID = userID;
        }
    }

    class ProfileScreen {
        constructor() {
            this.profileScreen = document.getElementById("profileScreen");

            let loadNewProfile = function () {
                let user = new User();

                let requestURL = "http://localhost:3000/";
                let request = new XMLHttpRequest();
                request.open("GET", requestURL);
                request.responseType = "json";
                request.send();

                request.onload = function () {
                    let JSONProfile = request.response;

                    event.eventTitle = JSONProfile["title"]; //string

                    profileScreen.addEventToScreen(event);
                }
            }

            let loadEvents = function (eventID) {
                let event = new Event;

                let requestURL = "http://localhost:3000/event/";
                let request = new XMLHttpRequest();
                request.open("GET", requestURL);
                request.responseType = "json";
                request.send();

                request.onload = function () {
                    let JSONEvent = request.response;

                    event.eventTitle = JSONEvent["title"]; //string

                    profileScreen.addEventToScreen(event);
                }
            }
        }

        addProfileToScreen(profile) {

        }

        addEventToScreen(event) {

        }
    }

    const profileScreen = new ProfileScreen();

});