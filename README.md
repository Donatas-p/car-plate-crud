# CarPlateCrud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Run frontend

Run `ng serve` for a dev frontend to work. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Run backend

Run `node server.js` to run a node server that would take data from locala MySQL server with user "root" and password "password" on database "plates_db"

Sql to create table

"CREATE TABLE `plates_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plate` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci "
