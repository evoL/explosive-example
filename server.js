import express from "express";
import fs from "fs";
import url from "url";
import jsdom from "jsdom";
import packageInfo from "./package.json";
import * as Explosive from "./src/explosive";

function urlFor(request) {
  let parsedUrl = url.parse(request.url);
  parsedUrl.protocol = request.protocol;
  parsedUrl.host = request.headers.host;

  return url.format(parsedUrl);
}

let browserFileName = packageInfo.browserOutput;
let layoutFileName = packageInfo.layout;
let layout = fs.readFileSync(layoutFileName);

let server = express();

// Handle static files
server.use(express.static('public'));

// Send the browser JS file
server.get('/' + browserFileName, function(request, response) {
  console.log(`Starting ${request.method} ${urlFor(request)}`)
  response.sendFile(browserFileName, {
    root: __dirname
  });
});

// Prerender the app
server.get('/', function(request, response) {
  let formattedUrl = urlFor(request);

  console.log(`Starting ${request.method} ${formattedUrl}`);

  let document = jsdom.jsdom(layout, {
    url: formattedUrl,
    document: {
      referrer: request.headers.referer,
      cookie: request.headers.cookie
    }
  });
  let window = document.defaultView;

  // Render the error list if something goes wrong
  window.addEventListener('load', function() {
    if (document.errors) {
      response.send(
        "<h1>There were errors while trying to prerender the page.</h1><ul>" +
        document.errors.map((e) => `<li>${e.message}<br><pre>${e.data.error}</pre></li>`).join('') +
        "</ul>"
      );
    }
  });

  // Redirect the console
  let virtualConsole = jsdom.getVirtualConsole(window);
  virtualConsole.on("log", function(message) {
    console.log("Client-side -", message);
  });

  // Setup Explosive runtime
  window.explosive = Explosive.explosive;
  Explosive.instance.once('ajax:finish', function() {
    // Create an element with shared state
    let sharedState = Explosive.instance.state();
    let scriptContent = `window._explosiveState = ${JSON.stringify(sharedState)};`;

    let script = document.createElement('script');
    script.appendChild(document.createTextNode(scriptContent));

    // Insert the state before any other scripts
    let firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Send HTML
    response.send(jsdom.serializeDocument(document));
  });
});

server.listen(8000);
