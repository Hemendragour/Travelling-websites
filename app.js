const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
const session = require("express-session")
const userRouter = require("./routes/user.js")
engine = require('ejs-mate'),

    // Database connectes


    app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "/public")));


const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));

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


app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});


app.get("/", (req, res) => {
    res.send("Hi i am hemendras gour")
});
// /New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});


// // //Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});



app.use(session(sessionOptions));
// app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "delta-student"
    })
    let register = await User.register(fakeUser, "helloworld")
    res.send(registerUser)
})

app.use("/", userRouter)

//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// app.get("/listing", (req, res) => {
// Listing.find({}).then((res) => {
// console.log(res)
// })
// })

// app.get("/testListing", async(req, res) => {
//     let sampleListing = new Listing({
//         title: "My  new villa",
//         description: "by the beach",
//         price: 2000,
//         location: "Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing"); 
// });



app.listen(8000, () => {
    console.log("Server is listening to port 8000")
})

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
// const path = require("path");
// // const methodOverride = require("method-override");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// // app.use(methodOverride("_method"));

// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

// //Index Route
// app.get("/listings", async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// });

// //New Route
// // app.get("/listings/new", (req, res) => {
// //   res.render("listings/new.ejs");
// // });

// // //Show Route
// // app.get("/listings/:id", async (req, res) => {
// //   let { id } = req.params;
// //   const listing = await Listing.findById(id);
// //   res.render("listings/show.ejs", { listing });
// // });

// // //Create Route
// // app.post("/listings", async (req, res) => {
// //   const newListing = new Listing(req.body.listing);
// //   await newListing.save();
// //   res.redirect("/listings");
// // });

// // //Edit Route
// // app.get("/listings/:id/edit", async (req, res) => {
// //   let { id } = req.params;
// //   const listing = await Listing.findById(id);
// //   res.render("listings/edit.ejs", { listing });
// // });

// // //Update Route
// // app.put("/listings/:id", async (req, res) => {
// //   let { id } = req.params;
// //   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
// //   res.redirect(`/listings/${id}`);
// // });

// // //Delete Route
// // app.delete("/listings/:id", async (req, res) => {
// //   let { id } = req.params;
// //   let deletedListing = await Listing.findByIdAndDelete(id);
// //   console.log(deletedListing);
// //   res.redirect("/listings");
// // });

// // app.get("/testListing", async (req, res) => {
// //   let sampleListing = new Listing({
// //     title: "My New Villa",
// //     description: "By the beach",
// //     price: 1200,
// //     location: "Calangute, Goa",
// //     country: "India",
// //   });

// //   await sampleListing.save();
// //   console.log("sample was saved");
// //   res.send("successful testing");
// // });

// app.listen(8080, () => {
//   console.log("server is listening to port 8080");
// });