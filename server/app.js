const express = require("express");
require("dotenv").config();
const querystring = require("querystring");
const clientId = process.env.CLIENT_ID;
const secretKey = process.env.SECRET_KEY;
const redirectUri = process.env.REDIRECT_URI;

var app = express();

app.get("/", (req, res) => {
  res.send("Hello Express" + redirectUri);
});
app.get("/login", function (req, res) {
  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
      })
  );
});
app.listen(process.env.PORT || 8000);
