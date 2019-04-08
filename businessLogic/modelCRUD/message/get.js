const db = require("../../../models");

module.exports = function(app) {
  require("../../util/errorHelpers");

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
