module.exports = function(app) {
  require("../../businessLogic/businessLogic/onMessagePost")(app);
  require("../../businessLogic/util/errorHelpers");

  app.post("/api/v1/contactMe", async function(req, res) {
    try {
      const result = await postMessageSendNotice(req.body);
      sendSuccess(res, "postMessageSendNotice")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });
};
