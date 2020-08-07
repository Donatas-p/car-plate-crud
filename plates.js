var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'plates_db'
});

con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log("Connected!");
});

module.exports = function (app) {
  app.get("/plates", function(request, response) {
      con.query("SELECT * FROM plates_db.plates_table", function (err, result, fields) {
        if (err) throw err;
        response.send(result);
      });

  });

  app.get("/plate/:id", function(request, response) {
    con.query("SELECT * FROM plates_db.plates_table WHERE id like ?",[request.params.id], function (err, result, fields) {
      if (err) throw err;
      response.send(result);
    });
  });

  app.get("/addPlate/:plate/:name/:surname",function(request, response) {
    con.query("INSERT INTO `plates_db`.`plates_table` (`plate`, `name`, `surname`) VALUES (?, ?, ?);",
    [
      request.params.plate,
      request.params.name,
      request.params.surname,
    ], function (err, result, fields) {
      if (err) throw err;
      response.send(result);
    });
  });

  app.get("/removePlate/:id",function(request, response) {
    con.query("DELETE FROM `plates_db`.`plates_table` WHERE(`id` = ?)",
    [request.params.id], function (err, result, fields) {
      if (err) throw err;
      response.send(result);
    });
  });

  app.get("/editPlate/:id/:plate/:name/:surname",function(request, response) {
    con.query("UPDATE `plates_db`.`plates_table` SET `plate` = ?, `name` = ?, `surname` = ? WHERE (`id` = ?);",
    [request.params.plate, request.params.name, request.params.surname, request.params.id], function (err, result, fields) {
      if (err) throw err;
      response.send(result);
    });
  });
};
