const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Database connectes

const MONGO_URL = "mongodb://127.0.0.1:27017/test";
main().then(() => {
    console.log("Db is connected")
}).catch(err => {
    console.log(error);
})
async function main() {
    await mongoose.connect(MONGO_URL)
}



app.get("/", (req, res) => {
    res.send("Hi i am hemendras gour")
});



app.listen(8000, () => {
    console.log("Server is listening to port 8000")
})
