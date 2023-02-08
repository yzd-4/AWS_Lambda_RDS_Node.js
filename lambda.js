// lambda.js
"use strict";
//The code starts by importing the "aws-serverless-express" library and the Express.js app.
const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");
const server = awsServerlessExpress.createServer(app);

//The exports.handler function acts as the entry point for the Lambda function.
exports.handler = (event, context) => {
  /*The function then calls the "awsServerlessExpress.proxy" method and passes the server, 
  event, and context as arguments. This method takes the incoming request, routes it to 
  the appropriate endpoint in the Express app, and returns the response to the client.*/
  awsServerlessExpress.proxy(server, event, context);
};
