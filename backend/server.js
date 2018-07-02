"use strict";

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var fs = require("fs");
var db = require(__dirname + "/database/db.json");

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json());
app.use(cors());
app.use("/public", express.static(__dirname + "/public"));

/**
 * Método para autenticar um usuário por email e senha
 */
app.post("/businesses/auth", (request, response) => {
  response.status(200).json(db.businesses[0]);
  response.end();
});

/**
 * Método para recuperar dados do dia para o restaurante.
 */
app.get("/businesses/:id/today", (request, response) => {
  let output = {
    resume: db.services[0].today,
    transactions: db.transactions
  };
  response.status(200).json(output);
  response.end();
});

/**
 * Método para recuperar dados do balcão.
 */
app.get(
  "/businesses/:business_id/counters/:counter_id",
  (request, response) => {
    let { business_id, counter_id } = request.params;
    counter_id = parseInt(counter_id, 10);
    response.status(200).json(db.counters[counter_id]);
    response.end();
  }
);

/**
 * Método para recuperar dados de um alimento no balcão.
 */
app.get(
  "/businesses/:business_id/counters/:counter_id/items/:item_id/edit",
  (request, response) => {
    let { business_id, counter_id, item_id } = request.params;
    counter_id = parseInt(counter_id, 10);
    item_id = parseInt(item_id, 10);
    response.status(200).json(db.counters[counter_id].compartiments[item_id]);
    response.end();
  }
);

/**
 * Método para atualizar dados de um alimento no balcão.
 */
app.post(
  "/businesses/:business_id/counters/:counter_id/items/:item_id",
  (request, response) => {
    const { compartiment } = request.body;
    let { business_id, counter_id, item_id } = request.params;
    if (db.counters[counter_id]) {
      let counter = db.counters[counter_id];
      if (counter.compartiments[item_id]) {
        let db_compartiment = counter.compartiments[item_id];
        db_compartiment.food = compartiment.food;
        db_compartiment.price = compartiment.price;
        db_compartiment.calories = compartiment.calories;
        db_compartiment.comments = compartiment.comments;
        fs.writeFile(
          __dirname + "/database/db.json",
          JSON.stringify(db),
          function(err) {
            if (err) throw err;
            response.json({ status: "success" });
            response.end();
          }
        );
      }
    }
  }
);

/**
 * Método para recuperar dados de um prato feito no restaurante.
 */
app.get("/users/:user_id/transactions/:transaction_id", (request, response) => {
  response.json(db.users[0].transactions[0]);
  response.end();
});

/**
 * Método para iniciar o servidor.
 */
app.listen(3001, function() {
  console.log("Server running on port 3001.");
});
