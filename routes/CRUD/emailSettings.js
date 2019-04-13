module.exports = function(app) {
  require("../../businessLogic/modelCRUD/emailSetting")(app);
  require("../../businessLogic/util/errorHelpers");

  app.get("/api/v1/email_settings/", async function(req, res) {
    try {
      const result = await getEmailSettingByUuid(req.query);
      sendSuccess(res, "getEmailSettingByUuid")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.post("/api/v1/email_settings/", async function(req, res) {
    try {
      const result = await postEmailSetting(req.body);
      sendSuccess(res, "postEmailSetting")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.put("/api/v1/email_settings/", async function(req, res) {
    try {
      const result = await putEmailSetting(req.body);
      sendSuccess(res, "putEmailSetting")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.delete("/api/v1/email_settings/", async function(req, res) {
    try {
      const result = await deleteEmailSetting(req.query.uuid);
      sendSuccess(res, "deleteEmailSetting")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });
};
