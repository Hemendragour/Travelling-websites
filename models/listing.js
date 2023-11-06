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
        default:"https://images.unsplash.com/photo-1666720125733-654896436137?auto=format&fit=crop&q=60&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxwaGFiZXQlMkJpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",

           set: (v) => v === "" ? "https://images.unsplash.com/photo-1666720125733-654896436137?auto=format&fit=crop&q=60&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxwaGFiZXQlMkJpbWFnZXxlbnwwfHwwfHx8MA%3D%3D" : v,
    },
    price: Number,
    location: String,
    country: String,
})

const Listing = mongoose.model("Listing ", listingSchema);
module.exports = Listing;