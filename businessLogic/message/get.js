const db = require("../../models");

module.exports = function(app) {
  require("../util/errorHelpers");

  this.getOneMessageOrg = (query, res) => {
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
      .then(returnResults())
      .catch(error => {
        throwError(400, "Data Error")(err);
      });
    return result;
  };
};
