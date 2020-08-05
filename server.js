const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:4000"]
};

app.use(cors(corsOptions));

app.listen(8000, () => {
  console.log("Server running");
});

app.get("/", function(request, response) {
  response.send("Works")
});

require('./plates.js')(app);
