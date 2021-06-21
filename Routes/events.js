const router = require('express').Router();
const Event = require('../Model/Event');
const {eventValidation} = require('../validation');
const User = require('../Model/User');
const path = require('path')
const verify = require('./verifyToken');


router.post('/', verify, async (req, res) => {
    //Validation
    const {error} = eventValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Create new event
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        postalcode: req.body.postalcode,
        numberofguests: req.body.numberofguests,
        user: User._id
    });
    try{
        const savedEvent = await event.save();
        res.send('Added event with ID: ' + event._id);
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const event = await Event.findById(req.params.id);
        if(!event) return res.status(400).send('Event not found!');
        res.json({title: event.title, description: event.description, location: event.location, postalcode: event.postalcode, numberofguests: event.numberofguests});
        }
    catch(error){
        return res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    Event.find({}, function(err, events) {
        var eventMap = {};
        var i = 1;
    
        events.forEach(function(event) {
          eventMap[i] = event;
          i++;
        });
    
        res.send(eventMap);  
        
      });
      //res.sendFile(path.join(__dirname, "../Frontend/login.html"));
});

module.exports = router;