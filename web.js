var port = Number(process.env.PORT || 8000);
var express = require('express');
var app = express();
var api = require('instagram-node').instagram();

api.use({ client_id: 'f0d178af21e64b3b954ef79d979fe869',
         client_secret: '7f4c9e4770b8463d95b2e8507108abf9' });

var redirect_uri = 'http://localhost:8000/handleauth';
// var redirect_uri = 'http://localhost:8000/handleauth'; // PROD

exports.authorize_user = function(req, res) {
    res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
    api.authorize_user(req.query.code, redirect_uri, function(err, result) {
        if (err) {
            console.log(err.body);
            res.send("Didn't work");
        } else {
            console.log('Yay! Access token is ' + result.access_token);
            res.send('You made it!!');
        }
    });
};

app.use(express.static(__dirname + '/app'));
// This is where you would initially send users to authorize

app.get('/authorize_user', exports.authorize_user);

// This is your redirect URI
app.get('/handleauth', exports.handleauth);

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});