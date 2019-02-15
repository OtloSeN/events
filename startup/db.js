const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/events', {
            useCreateIndex: true,
            useNewUrlParser: true
    })
        .then(() => console.log('Connected to Events DB...'))
        .catch(err => console.log(err));
}