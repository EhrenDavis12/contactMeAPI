const db = require("../../models");

module.exports = function(app) {
  require("../util/errorHelpers");

  this.putMessage = async body => {
    if (!body) throwError(400, "invalid request", "No body provided")();
    if (!body.uuid) throwError(400, "invalid request", "No UUID provided")();

    let query = {};
    query.uuid = body.uuid;

    let result = await db.message
      .update(body, {
        where: query
      })
      .then(returnResults())
      .catch(err => {
        throwError(400, "Data Error")(err);
      });

    return result;
  };
};
