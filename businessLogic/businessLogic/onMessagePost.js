module.exports = function(app) {
  require("../util/errorHelpers");
  require("../modelCRUD/message")(app);
  require("../modelCRUD/user")(app);
  require("../sendMessages")(app);

  this.postMessageSendNotice = async body => {
    const user = await getUserByUuid(body.userUuid);
    const postMessageResult = await postMessage(body);
    // post message
    // get user whats app info
    return postMessageResult;
  };
};
