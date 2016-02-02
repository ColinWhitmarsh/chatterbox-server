/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var fs = require("fs");


var objectId = 1;
var message = {results:[{
  username:'Jonoasdasdsa',
  text: 'Do my bidding!', 
  roomname: 'lobby',
}]};
//{results:[{"username":"Jono","message":"Do my bidding!"}]} 
//expect(messages[0].username).to.equal('Jono');


exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/JSON";     
  
  if(request.url.substring(0,8) === '/classes') {
    if(request.method === 'GET') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      // message.results.push(storage[0]);
      //console.log(message.results);
      
      fs.readFile(__dirname + '/storage.txt', 'utf8', function(err, data) {
          if(err) {
            throw err;
          }
          var responseAttempt = data.substr(0,data.length-2)+']}';
          console.log(responseAttempt);
          response.end(responseAttempt); //message

      });

    } else if (request.method === 'POST') {
      statusCode = 201;
      request.on('data', function (chunk) { 
        var data = JSON.parse(chunk);
        data.objectId = objectId++;
        fs.appendFile('./server/storage.txt', JSON.stringify(data, null, 2) + ", ", 'utf-8');
        message.results.push(data); 
      }); 
      response.writeHead(statusCode, headers);
      response.end();
    } else if (request.method === 'OPTIONS') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end();
    }
  } 
  else if (request.url) {
    //if the url is truthy but not /classes, do something else
    if (request.method === 'GET') {
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end();
    } else if (request.method === 'OPTIONS') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end();
    }
  } else { //if the url is just messed up
    if (request.method === 'OPTIONS') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end();
    } else {
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end();
    }
  }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

