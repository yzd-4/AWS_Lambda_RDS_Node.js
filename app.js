//The code starts by requiring the express and mysql2 library and creating an instance of the Express app:
const express = require("express");
const mysql = require("mysql2");
const app = express();

//Then, the code uses the `app.use` method to enable JSON parsing and URL-encoded data parsing in the request body:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Creates a connection to the AWS RDS database
const db = mysql.createConnection({
  host: "ENDPOINT", //Edit this
  port: "3306",
  user: "admin",
  password: "YOUR PASSWORD", //Edit this
  database: "DATABASE NAME", //Edit this
  connectionTimeout: 60000,
});
//Then connects to the database and logs a message if the connection is successful.
db.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Database connected.");
});

//The "/phones" endpoint returns all the data from the "phones" table in the RDS database
app.get("/phones", (req, res) => {
  // Prepare output in JSON format
  const q = "SELECT * FROM phones";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    res.status(200).end(JSON.stringify(data));
  });
});
//The "/phones/:id" endpoint returns the data of the phone with the specified id.
app.get("/phones/:id", function (req, res) {
  const q = "SELECT * FROM phones WHERE `id`= ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    res.status(200).end(JSON.stringify(data[0]));
  });
});

// The "/" and "/time" endpoints simply send a message or the current time to the client.
app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello from Lambda!</h1>");
});

app.get("/time", (req, res) => {
  let timeNow = Date(Date.now());
  res.status(200).send(`<h1>${timeNow.toString()}</h1>`);
});

//The "/logthis" endpoint logs the "name" field from the request body and sends a string containing the name back to the client.
app.post("/logthis", (req, res) => {
  const name = req.body.name;
  const toLog = `\n >>> Your name is ${name} <<<\n`;
  console.info(toLog);
  res.status(200).send(toLog);
});

//The code runs on port 8000 and exports the app as a module.
//This means that you can use this code as a module in another project,
//and run the app with the "app.listen(port)" method.
const port = 8000;
module.exports = app;
