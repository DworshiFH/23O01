const router = require('express').Router();
const Event = require('../Model/Event');
const {eventValidation} = require('../validation');
const User = require('../Model/User');
const path = require('path')
const verify = require('./verifyToken');
const objectID = require('mongodb').ObjectID;


router.post('/event/post', verify, async (req, res) => {
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
        user: req.session.userID
    });
    try{
        const savedEvent = await event.save();
        return res.json({status: 'ok', id: event._id});
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.get('/event', verify, async(req, res) =>{
    res.sendFile(path.join(__dirname, '../Frontend/makeEvent.html'));
})

//GET MY EVENTS
router.get('/userevents', verify, async (req, res) =>{
    let myEvents = await Event.find({user: objectID(req.session.userID)});

    res.json(myEvents);
})

router.get('/myevents', verify, async(req, res) =>{
    res.sendFile(path.join(__dirname, '../Frontend/myEvents.html'));
})

router.get('/event/:id', async (req, res) => {
    try{
        const event = await Event.findById(req.params.id);
        if(!event) return res.status(400).send('Event not found!');
        res.json({title: event.title, description: event.description, location: event.location, postalcode: event.postalcode, numberofguests: event.numberofguests});
        }
    catch(error){
        return res.status(400).send(error);
    }
});

router.get('/events', async (req, res) => {
    let events = await Event.find({});

    res.json(events);
});

//UPDATE EVENT DATA
router.put('/event/:id', verify, async(req,res) => {
    const item = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        postalcode: req.body.postalcode}

    try{
        await Event.updateOne({"_id": objectID(req.params.id)}, 
        {$set: item});

        return res.json({status: 'ok', id: req.params.id});
    }
    catch(err){
        res.status(400).send(err);
    }
})

//DELETE EVENT
router.delete('/event/:id', verify, async(req,res) => {
    try{
        await Event.deleteOne({"_id": objectID(req.params.id)});
        res.send('Event successfully deleted!');
    }
    catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;