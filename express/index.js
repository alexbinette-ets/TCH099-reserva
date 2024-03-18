const express = require("express");
const db = require("./db");
const app = express();


db.connect(app);


app.listen(5000, function () {
 console.log("Express écoute sur le port 5000!");
});