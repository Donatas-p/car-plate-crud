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
  con.query("CREATE TABLE IF NOT EXISTS `plates_table` ("
    + "`id` int NOT NULL AUTO_INCREMENT, "
    + "`plate` varchar(45) NOT NULL, "
    + "`name` varchar(45) NOT NULL, "
    + "`surname` varchar(45) NOT NULL, "
    + "PRIMARY KEY (`id`), "
    + "UNIQUE KEY `id_UNIQUE` (`id`), "
    + "UNIQUE KEY `plate` (`plate`) "
    + ") ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", )
  console.log("Connected!");
});

module.exports = function (app) {
  limiter = 10;
  app.get("/platesCount",function(request, response) {
    con.query("SELECT (COUNT(*)/"+ limiter + ") as lastPage FROM plates_db.plates_table;", function (err, result, fields) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      response.send(result);
    });
  });
  app.get("/plates/page/:page", function(request, response) {
      con.query("SELECT * FROM plates_db.plates_table order by name ASC limit " + limiter*(request.params.page-1) + "," + limiter*request.params.page + ";", function (err, result, fields) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        response.send(result);
      });

  });

  app.get("/plate/:id", function(request, response) {
    con.query("SELECT * FROM plates_db.plates_table WHERE id like ?",[request.params.id], function (err, result, fields) {
      if (err) {
        return console.error('error: ' + err.message);
      }
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
      if (err) {
        return console.error('error: ' + err.message);
      }
      response.send(result);
    });
  });

  app.get("/removePlate/:id",function(request, response) {
    con.query("DELETE FROM `plates_db`.`plates_table` WHERE(`id` = ?)",
    [request.params.id], function (err, result, fields) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      response.send(result);
    });
  });

  app.get("/editPlate/:id/:plate/:name/:surname",function(request, response) {
    con.query("UPDATE `plates_db`.`plates_table` SET `plate` = ?, `name` = ?, `surname` = ? WHERE (`id` = ?);",
    [request.params.plate, request.params.name, request.params.surname, request.params.id], function (err, result, fields) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      response.send(result);
    });
  });

  app.get("/search/:searchString",function(request, response) {
    con.query("SELECT * FROM plates_db.plates_table where plate like '%" + request.params.searchString + "%' "
    + "OR name like '%" + request.params.searchString + "%' "
    + "OR surname like '%" + request.params.searchString + "%';", function (err, result, fields) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      response.send(result);
    });
  });
};
