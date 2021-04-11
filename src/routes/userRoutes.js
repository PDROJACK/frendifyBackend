var express = require('express');
var router = express.Router();
var querystring = require('querystring');
const axios = require('axios');
const Config = require('../../config');

let redirect_uri = Config[process.env.NODE_ENV].REDIRECT_URI;
let frontend_uri = Config[process.env.NODE_ENV].FRONTEND;

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-email user-read-playback-state user-read-currently-playing user-read-private',
      redirect_uri
    })) 
});

/* Callback to dispatch client token */
router.get('/callback', async function(req, res) {
  let code = req.query.code || null
  
  let token = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64');

  let url = 'https://accounts.spotify.com/api/token'

  axios.post( url, querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri
    }) , {
      headers: {
        "Authorization": "Basic " + token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      var access_token = response.data.access_token
      let uri = frontend_uri
      res.redirect(uri + '?access_token=' + access_token)
  })
})

module.exports = router;