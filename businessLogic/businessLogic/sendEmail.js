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

    initEmailService(
      emailSetting.service | "gmail",
      emailSetting.email | process.env.REACT_EMAIL_Address,
      emailSetting.password | process.env.REACT_EMAIL_password
    );
    const result = await sendEmailService(
      emailSetting.email,
      emailSetting.email,
      "subject",
      "text"
    );
    return result;
  };
};
