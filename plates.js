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
    console.log('add plate works in node');
    con.query("INSERT INTO `plates_db`.`plates_table` (`plate`, `name`, `surname`) VALUES (?, ?, ?);",
    [
      request.params.plate,
      request.params.name,
      request.params.surname,
    ], function (err, result, fields) {
      if (err) throw err;
      response.send(result);
    });
  })
};
