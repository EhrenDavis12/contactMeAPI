const db = require("../../../models");

module.exports = function(app) {
  require("../../util/errorHelpers");

  this.getEmailSettingByUuid = async query => {
    if (!query.uuid & !query.userUuid)
      throwError(400, "invalid request", "No UUID or userUuid provided")();

    let result = await db.emailSetting
      .findOne({
        where: query
      })
      .then(returnResults())
      .catch(err => {
        throwError(400, "Data Error")(err);
      });
    return result;
  };
};
