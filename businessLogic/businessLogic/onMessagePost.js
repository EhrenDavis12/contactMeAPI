module.exports = function(app) {
  require("../util/errorHelpers");
  require("../modelCRUD/message")(app);
  require("../modelCRUD/user")(app);
  require("../messageServices")(app);
  require("./sendEmail")(app);

  this.postMessageSendNotice = async body => {
    const user = await getUserByUuid(body.userUuid);
    const postMessageResult = await postMessage(body);
    let whatsAppResult = null;
    let emailResult = null;

    if (user.phone) {
      whatsAppResult = await sendWhatsAppMessage(
        "Check your profile for a message!",
        user.phone
      );
    }
    if (user.email) {
      emailResult = await postEmail(body);
    }
    return {
      message: "Success",
      postMessageResult,
      whatsAppResult,
      emailResult
    };
  };
};
