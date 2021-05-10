let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/nodejs-restfull-api', { useNewUrlParser: true});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


// Setup server port
var port = process.env.PORT || 8080;


// Import routes
app.get('/', (req, res) => res.send('Hello World with Express'));

let routeContact = require("./routes/contact");
let routeUser = require("./routes/user");

app.use('/api', routeContact);
app.use('/api', routeUser);


// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});