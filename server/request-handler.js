var fs = require("fs");

var objectId = 1;

exports.requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode;
  var headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10,
    "Content-Type": "application/JSON"
  };
  
  if (request.method === 'OPTIONS') { //OPTIONS should always be 200 status code regardless of request.url
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  }

  if(request.url.substring(0,8) === '/classes') {
    if(request.method === 'GET') {
      fs.readFile(__dirname + '/storage.txt', 'utf8', function(err, data) {
          if(err) {
            throw err;
          }
          statusCode = 200;
          response.writeHead(statusCode, headers);
          response.end(data.substr(0,data.length-2)+']}'); 
      });
    } else if (request.method === 'POST') {
      request.on('data', function (chunk) { 
        var data = JSON.parse(chunk);
        data.objectId = objectId++;
        fs.appendFile('./server/storage.txt', JSON.stringify(data, null, 2) + ", ", 'utf-8');
      }); 
      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end();
    } 
  } else { //if the url is just messed up
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

};



