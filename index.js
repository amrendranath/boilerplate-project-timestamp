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
app.route("/api/:date").get((req, res) => {
  let dateObject;
  if (isNaN(req.params.date)) {
    dateObject = new Date(req.params.date);
  } else {
    dateObject = new Date(parseInt(req.params.date));
  }

  if (dateObject.toUTCString() === "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString(),
    });
  }
});

app.route("/api/").get((req, res) => {
  let date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
