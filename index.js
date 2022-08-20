// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:time", function (req, res) {
  const { time } = req.params;
  const datetime = isNaN(time) ? time : +time;
  res.json({
    unix: new Date(datetime).valueOf(),
    utc: new Date(datetime).toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
