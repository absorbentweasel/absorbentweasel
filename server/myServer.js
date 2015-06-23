var express = require("express");
var morgan = require("morgan");
var parser = require("body-parser");
var router = require("./routes.js");
var passport = require("passport");

var db = require('./db/config');


var app = express();
module.exports.app = app;

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(parser.json());

app.use("/", router);

app.use(passport.initialize());
app.use(passport.session());
//TODO: Need to hookup the client here!
app.use(express.static(__dirname + "/../client"));

if (!module.parent) {
	app.listen(app.get("port"));
	console.log("Listening on", app.get("port"));
}