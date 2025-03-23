const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true
    },
    numberInStock: {
        type: Number,
        min: 1
    },
    dailyRentalRate: Number
}));

module.exports = Movie;