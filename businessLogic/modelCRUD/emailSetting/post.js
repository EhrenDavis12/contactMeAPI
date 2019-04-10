const db = require("../../../models");

module.exports = function(app) {
  require("../../util/errorHelpers");

  this.postEmailSetting = async body => {
    if (!body) throwError(400, "invalid request", "No rest body provided")();

    delete body.uuid;
    let result = await db.emailSetting
      .create(body)
      .then(returnResults())
      .catch(err => {
        throwError(400, "Data Error")(err);
      });
    return result;
  };
};
