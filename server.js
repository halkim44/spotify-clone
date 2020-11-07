const express = require("express");
const querystring = require("querystring");
const request = require("request");
const path = require("path");
var cookieParser = require("cookie-parser");
const axios = require("axios");
const oauth = require("axios-oauth-client");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const clientId = process.env.CLIENT_ID;
const secretKey = process.env.SECRET_KEY;
const redirectUri = process.env.REDIRECT_URI;

const stateKey = "spotify_auth_state";

const generateRandomText = (length) => {
  var text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const app = express();
app.use(express.static(__dirname + "/client/build")).use(cookieParser());

app.get("/login", function (req, res) {
  var state = generateRandomText(16);
  res.cookie(stateKey, state);

  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
      })
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null; // An authorization code that can be exchanged for an access token
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: querystring.stringify({
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      headers: {
        Authorization:
          "Basic " + Buffer.from(clientId + ":" + secretKey).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36",
      },
    };
    axios(authOptions)
      .then((response) => {
        /*
        const access_token = body.access_token,
          refresh_token = body.refresh_token;
        res.redirect(
          "/#" +
            querystring.stringify({
              access_token,
              refresh_token,
            })
        );
        */

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      });
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret, "utf-8").toString(
          "base64"
        ),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

app.listen(process.env.PORT || 8000);
