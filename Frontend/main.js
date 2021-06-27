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

    function createCookie(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    const cookie = getCookie('id');

    const header = document.getElementById('header');
    let logout = document.getElementById('logoutForm');

    if(cookie){
        logout.id = 'logoutForm';
        logout.addEventListener('submit', () =>{
            createCookie('id', '', -1);
            alert('Successfully logged out!');
            window.location.replace('http://localhost:3000/');
        });
    }
    else{
        //Hiding the menu
        let mySidebar = document.getElementById('mySidebar');

        logout.style.visibility = 'hidden';
        mySidebar.style.visibility = 'hidden';

        //Creating the login and signup buttons
        let loginButton = document.createElement('button');
        let signUpButton = document.createElement('button');
        let loginButtonText = document.createTextNode('Login');
        let signUpButtonText = document.createTextNode('Sign Up');

        loginButton.id = 'login';
        signUpButton.id = 'signup';

        loginButton.appendChild(loginButtonText);
        signUpButton.appendChild(signUpButtonText);

        loginButton.addEventListener('click', () =>{
            window.location.replace('http://localhost:3000/login');
        });

        signUpButton.addEventListener('click', () =>{
            window.location.replace('http://localhost:3000/register');
        });

        header.appendChild(loginButton);
        header.appendChild(signUpButton);
    }

    class MyEvent{
        constructor(eventID, eventTitle, eventDesc, eventLocation, eventPostalCode, eventNumberOfGuests) {
            this.eventID = eventID;
            this.eventTitle = eventTitle; //string
            this.eventDesc = eventDesc; //string
            this.eventLocation = eventLocation; //string
            this.eventPostalCode = eventPostalCode; //int
            this.eventNumberOfGuests = eventNumberOfGuests; //int
            //this.eventPostingDate = null;
        }
    }

    class Dashboard {
        constructor() {
            this.eventsScreen = document.getElementById("myEventsScreen");

            let loadEvents = function () {
                let myEvent = new MyEvent;

                let requestURL = "http://localhost:3000/events/";
                let request = new XMLHttpRequest();
                request.open("GET", requestURL);
                request.responseType = "json";
                request.send();

                request.onload = function () {
                    let JSONEventArray = request.response;

                    for(var i = 0; i < JSONEventArray.length; i++) {
                        var JSONevent = JSONEventArray[i];
                        myEvent.eventID = JSONevent["_id"];
                        myEvent.eventTitle = JSONevent["title"]; //string
                        myEvent.eventDesc = JSONevent["description"];
                        myEvent.eventLocation = JSONevent["location"];
                        myEvent.eventPostalCode = JSONevent["postalcode"];
                        myEvent.eventNumberOfGuests = JSONevent["numberofguests"];

                        dashboard.addEventToScreen(myEvent);
                    }
                }
            }
            loadEvents();
        }

        addEventToScreen(event){
            this.mainEventScreen = document.getElementById("mainEventScreen");
            this.article = document.createElement("article");
            this.mainEventScreen.appendChild(this.article);

            if(event.FE_ID % 2 === 0){
                this.article.class = "right";
            } else {
                this.article.class = "left";
            }

            //TODO implement IMG storage in DB
            /*this.eventImg = document.createElement("img");
            this.eventImg.src = event.eventImg;
            this.article.appendChild(this.eventImg);*/

            this.h2 = document.createElement("h2");
            this.h2.textContent = event.eventTitle;
            this.article.appendChild(this.h2);
            this.p2 = document.createElement("p");
            this.p2.textContent = 'Description: ' + event.eventDesc;
            this.article.appendChild(this.p2);
            this.p3 = document.createElement("p");
            this.p3.textContent = 'Location: ' + event.eventLocation;
            this.article.appendChild(this.p3);
            this.p4 = document.createElement("p");
            this.p4.textContent = 'Postal Code: ' + event.eventPostalCode;
            this.article.appendChild(this.p4);
            this.p5 = document.createElement("p");
            this.p5.textContent = 'Number of Guests: ' + event.eventNumberOfGuests;
            this.article.appendChild(this.p5);

            //TODO add button to go to event page
            /*this.p4 = document.createElement("p");
            this.button = document.createElement("button");
            this.button.type = "button";
            this.button.id = "showEventButton_" + event.FE_ID;
            this.buttontext = document.createTextNode("Show Event");
            this.button.onclick =
                window.location.replace('http://localhost:3000/event/' + event.eventID);
            this.button.appendChild(this.buttontext);
            this.p4.appendChild(this.button);
            this.article.appendChild(this.p4);*/
        }
    }
    const dashboard = new Dashboard();
});