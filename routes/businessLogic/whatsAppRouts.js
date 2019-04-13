module.exports = function(app) {
  require("../../businessLogic//messageServices/whatsAppMessage")(app);

  app.post("/api/v1/whatsapp/test", async function(req, res) {
    try {
      const result = await sendWhatsAppMessage(
        "Check your profile for a message!",
        process.env.Dev_Phone
      );
      sendSuccess(res, "sendWhatsAppMessage")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });
};
