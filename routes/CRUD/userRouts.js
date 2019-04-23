module.exports = function(app) {
  require("../../businessLogic/modelCRUD/user")(app);
  require("../../businessLogic/util/errorHelpers");

  /* app.get("/api/v1/users/", async function(req, res) {
    try {
      const result = await getUserByUuid(req.query.uuid);
      sendSuccess(res, "getUserByUuid")(result);
    } catch (err) {
      sendError(res)(err);
    }
  }); */

  app.get("/api/v1/users/", async function(req, res) {
    try {
      const result = await getUserByAnyID(req.query);
      sendSuccess(res, "getUserByAnyID")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.post("/api/v1/users", async function(req, res) {
    try {
      const result = await postUser(req.body);
      sendSuccess(res, "postUser")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.put("/api/v1/users/", async function(req, res) {
    try {
      const result = await putUser(req.body);
      sendSuccess(res, "putUser")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });

  app.delete("/api/v1/users/", async function(req, res) {
    try {
      const result = await deleteUser(req.query.uuid);
      sendSuccess(res, "deleteUser")(result);
    } catch (err) {
      sendError(res)(err);
    }
  });
};
