module.exports = function(app) {
  require("../businessLogic/sendMessages")(app);

  app.post("/api/v1/whatsApp/order_notification", async function(req, res) {
    try {
      const result = await sendWhatsAppOrderNotification();
      sendSuccess(res, "sendWhatsAppOrderNotification")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.post("/api/v1/whatsApp/appointment_reminders", async function(req, res) {
    try {
      const result = await sendWhatsAppAppointmentReminders();
      sendSuccess(res, "sendWhatsAppAppointmentReminders")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.post("/api/v1/whatsApp/2way_message", async function(req, res) {
    try {
      const result = await sendWhatsApp2wayMessage();
      sendSuccess(res, "sendWhatsApp2wayMessage")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });
};
