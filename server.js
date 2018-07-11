const express = require("express");
const hbs       = require("hbs");
const fs        = require("fs");


hbs.registerPartials('./views/partials');

var app = express();
app.use(express.static("public"));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} - ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    //code
   next(); 
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Node web server listner Service spinning, up. We're in the pipe, 5 by 5!");
});