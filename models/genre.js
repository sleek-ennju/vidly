const mongoose = require('mongoose');

// DB matters
const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: {
        type: String,
        enum: ["action", "adventure", "comedy", "drama", "horror", "fantasy", "romance"],
        required: true,
        minLength: 3,
        maxLength: 100,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        minLength: 7,
        maxLength: 255
    },
    tags: {
        type: Array,
        required: true,
        validate: {
            validator: function (v){
                return v && v.length >= 3
            },
            message: "Please enter at least 3 tags"
        }
    },
    category: {
        type: String,
        enum: ["movies", "anime", "cartoon"],
        required: true,
        lowercase: true
    },
}));


exports.Genre = Genre;