/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require("body-parser");


/* Serving static files in express */
app.use(express.static('morgi2'));
// app.use('morgi/css', express.static('css'));
// app.use('morgi/vendor', express.static('vendor'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* Main Page for Slide Master */
app.get('/', function(req, res) {

    /* Sends the index html page to the user */
    fs.readFile('morgi2/index.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});


var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port);
});
// [END app]