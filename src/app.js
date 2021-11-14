const express = require("express");
const app = express();
const notesRouter = require("./notes/notes.router");
const path = require("path");
const notes = require(path.resolve("src/data/notes-data"));

app.use(express.json());


// notes router 
app.use("/notes", notesRouter);

// not found handler
app.use((req, res, next) => {
  return next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  // returns a status code of 500 by default, or status property of error
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;