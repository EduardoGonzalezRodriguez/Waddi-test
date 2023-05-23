const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3001; // Setting up the port number
const app = express(); // Creating an instance of Express.js

app.use(morgan("common")); // Using Morgan middleware to log requests
app.use(helmet()); // Using Helmet middleware to secure the app
app.use(cors()); // Using CORS middleware to enable cross-origin requests
app.use(cookieParser()); // Using cookie-parser middleware to handle cookies

app.use(async (req, res, next) => {
  // Defining a middleware function for setting headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next(); // Calling the next middleware function
});

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse application/json

app.use("/users", usersRoute);
app.use("/posts", postsRoute);

/* Error handler middleware */
app.use((err, req, res, next) => {
  // Defining a middleware function for handling errors
  const statusCode = err.statusCode || 500; // Setting up the status code for the response
  console.error(err.message, err.stack); // Logging the error message and stack trace
  res.status(statusCode).json({ message: err.message }); // Sending the error message as a response

  return; // Returning from the middleware function
});

app.listen(port); // Starting the server and listening on the specified port number
