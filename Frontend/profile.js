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

    const id = getCookie('id');

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
                const user = new User();

                let requestURL = "http://localhost:3000/user/" + id.toString();
                let request = new XMLHttpRequest();
                request.open("GET", requestURL);
                request.responseType = "json";
                request.send();

                request.onload = function () {
                    let JSONProfile = request.response;

                    user.firstname = JSONProfile["firstname"]; //string
                    user.lastname = JSONProfile["lastname"];
                    user.email = JSONProfile["email"];
                    user.userID = id;

                    profileScreen.addProfileToScreen(user);
                }
            }

            loadNewProfile();

            let loadEvents = function (eventID, user) {
                let event = new Event;

                let requestURL = "http://localhost:3000/event/" + id.toString();
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
            this.main = document.getElementById("profileScreen");

            this.article = document.createElement("article");
            this.name = document.createElement("p");
            this.name.id = 'name';
            this.nameText = document.createTextNode('Greetings ' + profile.firstname + ' ' + profile.lastname + '!');
            this.name.appendChild(this.nameText);
            this.article.appendChild(this.name);

            this.email = document.createElement("p");
            this.email.id = 'email';
            this.emailText = document.createTextNode('Your email is: ' + profile.email);
            this.email.appendChild(this.emailText);
            this.article.appendChild(this.email);

            this.main.appendChild(this.article);
        }

        addEventToScreen(event) {
            this.main = document.getElementById("profileScreen");

            this.article = document.createElement("article");
            this.name = document.createElement("p");
        }
    }

    const profileScreen = new ProfileScreen();
});