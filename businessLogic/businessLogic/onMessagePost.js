module.exports = function(app) {
  require("../util/errorHelpers");
  require("../modelCRUD/message")(app);
  require("../modelCRUD/user")(app);
  require("../sendMessages")(app);

  this.postMessageSendNotice = async body => {
    const user = await getUserByUuid(body.userUuid);
    const postMessageResult = await postMessage(body);
    const results = await sendWhatsAppAppointmentReminders(
      "Check your profile for a message!"
    );
    return results;
  };
};
