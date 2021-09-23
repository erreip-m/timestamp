// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  let date
  if (Number.isNaN(Date.parse(req.params.date)) && req.params.date) {
    date = new Date(parseInt(req.params.date))
  }
  else {
    date = (req.params.date ? new Date(Date.parse(req.params.date)) : new Date())
  }
  if (!date.getTime()) {
    res.json({ 'error': "Invalid Date" })
  }
  res.json({ 'unix': date.getTime(), 'utc': date.toUTCString() })
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
