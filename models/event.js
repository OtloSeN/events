const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength:40,
        required: true
    },
    description: {
        type: String,
        maxlength: 255
    },
    slug: {
        type: String,
        // required:true,
        unique: true
    }
});

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}

EventSchema.pre('save', function (next) {
    this.slug = slugify(this.name);

    next();
})

const event = mongoose.model('event', EventSchema);

module.exports = event;