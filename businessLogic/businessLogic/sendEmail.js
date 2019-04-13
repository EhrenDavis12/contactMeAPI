module.exports = function(app) {
  require("../util/errorHelpers");
  require("../modelCRUD/message")(app);
  //require("../modelCRUD/user")(app);
  require("../modelCRUD/emailSetting")(app);
  require("../messageServices")(app);

  this.postEmail = async body => {
    //const user = await getUserByUuid(body.userUuid);
    const postMessageResult = await postMessage(body);
    const emailSetting = await getEmailSettingByUuid({
      userUuid: body.userUuid
    });

    initEmailService();

    const result = await sendEmailService(
      emailSetting.email,
      emailSetting.email,
      "subject hello world",
      "text text and more"
    );
    return result;
  };
};
