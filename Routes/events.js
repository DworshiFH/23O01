const router = require('express').Router();
const Event = require('../Model/Event');
const {eventValidation} = require('../validation');
const User = require('../Model/User');


router.post('/', async (req, res) => {
    //Validation
    const {error} = eventValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Create new event
    const event = new Event({
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

module.exports = router;