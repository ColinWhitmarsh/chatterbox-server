/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


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

  var storage = {};
  // The outgoing status.
  var statusCode = 404;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  var message = {results:[]};

  //var urlStringified = '' + request.url;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  if(request.method === 'GET') {
    statusCode = 200;
    console.log('GET REQWIUHEIUEQWFHIUFEW');
    if(request.url.substring(0,8) === '/classes') {
      console.log('cheap pass of equlity');
      headers['Content-Type'] = "application/JSON";
    } else {
      headers['Content-Type'] = "text/plain";
      console.log("we failed equality");
    }
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(message));
  } else if(request.method === 'POST'){

    statusCode = 201;  
    console.log('POST request heard');

    // if(request.url === '/send') {
      headers['Content-Type'] = "application/JSON";
    // } else {

    // }
    response.writeHead(statusCode, headers);
    response.end();
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

