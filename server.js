import express from "express";
import fs from "fs";
import url from "url";
import jsdom from "jsdom";
import packageInfo from "./package.json";
import * as Explosive from "./src/explosive";

let browserFileName = packageInfo.browserOutput;
let layoutFileName = packageInfo.layout;
let layout = fs.readFileSync(layoutFileName);

let server = express();

// Handle static files
server.use(express.static('public'));

// Send the browser JS file
server.get('/' + browserFileName, function(request, response) {
  response.sendFile(browserFileName, {
    root: __dirname
  });
});

// Prerender the app
server.get('/', function(request, response) {
  let parsedUrl = url.parse(request.url);
  parsedUrl.protocol = request.protocol;
  parsedUrl.host = request.headers.host;

  let formattedUrl = url.format(parsedUrl);

  console.log(`Starting ${request.method} ${formattedUrl}`);

  let document = jsdom.jsdom(layout, {
    url: formattedUrl,
    document: {
      referrer: request.headers.referer,
      cookie: request.headers.cookie
    },
    done: function(errors, window) {
      if (errors) {
        response.send(
          "<h1>There were errors while trying to prerender the page.</h1><ul>" +
          errors.map((e) => `<li>${e.message}</li>`).join('') +
          "</ul>"
        );
        errors.forEach((e) => console.error(e.data.error));
      }
    }
  });
  let window = document.defaultView;

  window.explosive = Explosive.explosive;
  Explosive.instance.once('ajax:finish', function() {
    response.send(jsdom.serializeDocument(document));
  });
});

// server.get('/', function(request, response) {
//   response.send(React.renderToString(React.createElement(StoriesPage)));
// });

server.listen(8000);
