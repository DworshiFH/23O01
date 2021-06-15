document.addEventListener("DOMContentLoaded", function (event) {
    let eventsOnScreen = [];
    let FE_ID = 1;

    class Event{
        constructor(eventTitle, eventDesc, eventLocation, eventPostalCode) {
            FE_ID++;
            this.FE_ID = FE_ID;
            this.eventTitle = eventTitle; //string
            this.eventDesc = eventDesc; //string
            this.eventLocation = eventLocation; //string
            this.eventPostalCode = eventPostalCode; //int
            this.eventPostingDate = null;
        }
    }

    module.exports(Event);

    class Dashboard {
        constructor() {
            this.mainEventScreen = document.getElementById("mainEventScreen");


            let loadNewEvent = function (eventID){
                let event = new Event;

                let requestURL = ""; //TODO add URL, talk to BIG DICK RICHARD
                let request = new XMLHttpRequest();
                request.open("GET", requestURL);
                request.responseType = "json";
                request.send();

                request.onload = function () {
                    let JSONEvent = request.response;

                    event.eventTitle = JSONEvent["title"]; //string
                    event.eventDesc = JSONEvent["description"]; //string
                    event.eventLocation = JSONEvent["location"]; //string
                    event.eventPostalCode = JSONEvent["postalcode"]; //int
                    event.eventPostingDate = JSONEvent["Date"];
                    //TODO implement rest of JSON to object translation

                    dashboard.addEventToScreen(event);
                }
            }

            window.addEventListener('scroll', function () {
                if (window.scrollY >= document.getElementById("mainBookScreen").clientHeight - window.innerHeight - 10) {
                    loadNewEvent(FE_ID);
                    FE_ID++;
                }
            });
        }

        addEventToScreen(event){
            this.article = document.createElement("article");

            if(event.FE_ID % 2 ===0){
                this.article.class = "right";

            } else {
                this.article.class = "left";
            }

            //TODO implement IMG storage in DB
            /*this.eventImg = document.createElement("img");
            this.eventImg.src = event.eventImg;
            this.article.appendChild(this.eventImg);*/
            var eventURL = '#main.html'

            this.p1 = document.createElement("p");
            this.p1.textContent = event.eventTitle;
            this.article.appendChild(this.p1);
            this.p2 = document.createElement("p");
            this.p2.textContent = event.eventDesc;
            this.article.appendChild(this.p2);
            this.p3 = document.createElement("p");
            this.p3.textContent = event.eventLocation;
            this.article.appendChild(this.p3);

            /***
             * Button to go to Event Page
             */
            this.p4 = document.createElement("p");
            this.button = document.createElement("button");
            this.button.type = "button";
            this.button.id="showEventButton"+event.FE_ID;
            this.buttontext = document.createTextNode("Show Event");
            this.button.onclick = event => {
                //TODO call function to go to Event Page



            };
            this.button.appendChild(this.buttontext);
            this.p4.appendChild(this.button);
            this.article.appendChild(this.p4);
        }
    }

    const dashboard = new Dashboard();

});