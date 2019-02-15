const Event = require('../../models/event');

module.exports = {
    showEvents,
    showSingle
}

async function showEvents(req, res) {
    const events = await Event.find();

    if(events.length ==0) return res.send('No Events Added yet');

    res.json(events);
}

async function showSingle(req, res) {
    const slug = req.params.slug;

    const event = await Event.findOne({ slug });

    if(!event) return res.status(404).send('Not Found');

    res.json(event);
}