const db = require("../../models");

module.exports = function(app) {
  require("../util/errorHelpers");

  this.basicHit = () => {
    return "Test hit is working!";
  };

  this.getOneMessage = (query, res) => {
    db.message
      .findOne({
        where: query
      })
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        console.log(err.message);
        res.status(400).json(err.message);
      });
  };

  this.getMessageByUuid = async uuid => {
    if (!uuid) throwError(400, "invalid request", "No UUID provided")();

    let query = {};
    query.uuid = uuid;

    let result = await db.message
      .findOne({
        where: query
      })
      /* .then(() => {
        throwIf(r => !r, 400, "not found", "No message found");
        //throwError(500, "sequelize error");
      }) */
      .then(returnResults())
      .catch(error => {
        throwError(error.code, error.errorType, error.message)();
      });
    return result;
  };
};
