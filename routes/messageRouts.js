var db = require("../models");

module.exports = function(app) {
  app.get("/api/v1/messages/", function(req, res) {
    try {
      var query = {};
      query.uuid = req.query.uuid;

      db.message
        .findOne({
          where: query
        })
        .then(function(dbmessage) {
          res.json(dbmessage);
        });
    } catch (err) {
      res.status(400).json("Invalid request");
    }
  });

  app.post("/api/v1/messages", function(req, res) {
    try {
      delete req.body.uuid;
      db.message
        .create(req.body)
        .then(function(dbmessage) {
          res.status(200).json(dbmessage);
        })
        .catch(function(err) {
          console.log(err.message);
          res.status(400).json(err.message);
        });
    } catch (err) {
      res.status(400).json("Invalid request");
    }
  });

  app.put("/api/v1/messages/", function(req, res) {
    try {
      var query = {};
      query.uuid = req.body.uuid;

      db.message
        .update(req.body, {
          where: query
        })
        .then(function(dbmessage) {
          res.json(dbmessage);
        })
        .catch(function(err) {
          console.log(err.message);
          res.status(400).json(err.message);
        });
    } catch (err) {
      res.status(400).json("Invalid request");
    }
  });

  app.delete("/api/v1/messages/", function(req, res) {
    try {
      var query = {};
      query.uuid = req.query.uuid;

      db.message
        .destroy({
          where: query
        })
        .then(function(results) {
          res.json(results);
        });
    } catch (err) {
      res.status(400).json("Invalid request");
    }
  });
};
