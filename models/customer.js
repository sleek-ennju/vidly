const mongoose = require('mongoose');

// db matters
const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    phone: { 
        type: Number,
        required: true,
        min: 10,
        max: 11
    },
    isGold: {
        type: Boolean,
        default: false,
    }
}))


exports.Customer = Customer;