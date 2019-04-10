module.exports = function(app) {
  require("../../businessLogic/businessLogic/onMessagePost")(app);
  require("../../businessLogic/businessLogic/sendEmail")(app);
  require("../../businessLogic/util/errorHelpers");

  app.post("/api/v1/contactMe", async function(req, res) {
    try {
      const result = await postMessageSendNotice(req.body);
      sendSuccess(res, "postMessageSendNotice")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.post("/api/v1/contactMe/sendEmail", async function(req, res) {
    try {
      const result = await postEmail(req.body);
      sendSuccess(res, "postEmail")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });
};
