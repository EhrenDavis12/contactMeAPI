const db = require("../../../models");

module.exports = function(app) {
  require("../../util/errorHelpers");

  this.deleteUser = async uuid => {
    if (!uuid) throwError(400, "invalid request", "No UUID provided")();

    let query = {};
    query.uuid = uuid;

    let result = await db.user
      .destroy({
        where: query
      })
      .then(returnResults())
      .catch(err => {
        throwError(400, "Data Error")(err);
      });

    return result;
  };
};
