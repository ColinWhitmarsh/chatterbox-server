var express = require("express");
var path = require("path");
var handleRequest = require("./request-handler.js").requestHandler;

var port = 3000;
var ip = "127.0.0.1";

var app = express();
app.use('/', express.static(path.normalize(__dirname + "/../client/client")));
app.use('/', handleRequest);

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});



