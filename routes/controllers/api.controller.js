const Event = require('../../models/event');
const Joi = require('joi');

module.exports = {
    createEvent,
    getEdit,
    editEvent,
    deleteEvent
}

async function createEvent(req, res) {
    const name = req.body.name;
    const description = req.body.description;

    const schema = {
        name: Joi.string().max(40),
        description: Joi.string().max(255)
    }

    const result = Joi.validate({ name, description }, schema);

    if(result.error) return res.send('Invalid input.');

    const event = new Event({
        name,
        description
    });

    event.save()
        .then(event => res.json(event))
        .catch(err => console.log(err));
}

async function getEdit(req, res) {
    const slug = req.params.slug;

    const event = await Event.findOne({ slug });

    if(!event) return res.status(404). send('Not Found');

    res.json(event);
}

async function editEvent(req, res) {
    const slug = req.params.slug;
    const name = req.body.name;
    const description = req.body.description;

    const schema = {
        name: Joi.string().max(40),
        description: Joi.string().max(255)
    }

    const result = Joi.validate({ name, description }, schema);
    if (result.error) return res.send('Invalid input.');

    const updatedEvent = await Event.findOneAndUpdate({
        slug
    }, {
        name,
        description
    }, {
        new: true
    });

    res.json(updatedEvent);
}

async function deleteEvent(req, res) {
    const slug = req.params.slug;

    const event = await Event.findOneAndDelete({ slug });

    res.json(`Event ${event.name} deleted.`);
}