module.exports = function(app) {
  require("../../businessLogic/modelCRUD/message")(app);
  require("../../businessLogic/util/errorHelpers");

  app.get("/api/v1/messages/", async function(req, res) {
    try {
      const result = await getMessageByUuid(req.query.uuid);
      sendSuccess(res, "getMessageByUuid")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.post("/api/v1/messages", async function(req, res) {
    try {
      const result = await postMessage(req.body);
      sendSuccess(res, "postMessage")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.put("/api/v1/messages/", async function(req, res) {
    try {
      const result = await putMessage(req.body);
      sendSuccess(res, "putMessage")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.delete("/api/v1/messages/", async function(req, res) {
    try {
      const result = await deleteMessage(req.query.uuid);
      sendSuccess(res, "deleteMessage")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });
};
