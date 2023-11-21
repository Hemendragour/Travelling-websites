const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/test";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log(initData.data)
    // await Listing.insertMany(initData.data);
    try {
        await Listing.collection.insertMany(initData.data);
         console.log('Inserted ten rogues in collection');
    } catch (err) {
        console.error(err);
    }
    console.log("data was initialized");
};

initDB();