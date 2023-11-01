const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: String,
    image: {
        type: String,



    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.models("Listing ", listingSchema);
