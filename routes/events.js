const router = require('express').Router();
const eventController = require('./controllers/event.controller');

router.get('/', eventController.showEvents);

router.get('/:slug', eventController.showSingle);

module.exports = router;