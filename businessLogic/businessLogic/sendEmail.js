module.exports = function(app) {
  require("../util/errorHelpers");
  require("../modelCRUD/message")(app);
  require("../modelCRUD/user")(app);
  require("../messageServices")(app);

  this.postEmail = async (userUuid, messageUuid) => {
    const message = await getMessageByUuid(messageUuid);
    const emailSetting = await getEmailSettingByUserUuid(userUuid);

    initEmailService(service, emailAddress, password);
    const result = await sendEmailService(from, to, subject, text);
    return result;
  };
};
