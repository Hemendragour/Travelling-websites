const express = require("express");
const app = express();
const session = require("express-session");
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionOptions));

// app.get("/reqcount", (req, res) => {
//     res.send(`you sent a request x time`)
// })

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    console.log(req.session.name);
    res.send(name);
})




app.listen(3000, () => {
    console.log("server is run")
})