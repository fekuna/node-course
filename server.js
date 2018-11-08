const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear;
})

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
})

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append server.log");
        }
    })

    next();
})

// app.use((req, res, next) => {
//     res.render("maintenance")
// })

app.get('/', (req, res) => {
    res.render("home", {
        pageTitle: "Home page",
        welcomeMessage: "Welcome to the home page",
        currentYear: new Date().getFullYear()
    })
});

app.get("/bad", (req, res) => {
    res.send("Data not found");
});

app.get("/about", (req, res) => {
    res.render("about", {
        pageTitle: "About Page",
        currentYear: new Date().getFullYear()
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});