import express from "express";
import explosiveServer from "explosive/server";
import packageInfo from "./package.json";

let browserFileName = packageInfo.browserOutput;
let layoutFileName = packageInfo.layout;

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
server.use(explosiveServer({
  layout: layoutFileName,
  debug: true
}));

server.listen(8000, function() {
  console.log("Listening on port 8000…");
});
