const db = require("../../../models");

module.exports = function(app) {
  require("../../util/errorHelpers");

  this.getUserByUuid = async uuid => {
    if (!uuid) throwError(400, "invalid request", "No UUID provided")();

    let query = {};
    query.uuid = uuid;

    let result = await db.user
      .findOne({
        where: query
      })
      .then(returnResults())
      .catch(error => {
        throwError(400, "Data Error")(err);
      });
    return result;
  };

  this.getUserByAnyID = async query => {
    if (!query)
      throwError(400, "invalid request", "No Query ID data provided")();
    if (!query.uuid && !query.auth0Id && !query.userUuid)
      throwError(400, "invalid request", "No user UUID or auth ID provided")();

    const localQuery = {};
    if (query.uuid) localQuery.uuid = query.uuid;
    if (query.auth0Id) localQuery.auth0Id = query.auth0Id;
    if (query.userUuid && !query.uuid) localQuery.uuid = query.userUuid;

    let result = await db.user
      .findOne({
        where: localQuery
      })
      .then(returnResults())
      .catch(error => {
        throwError(400, "Data Error")(err);
      });
    return result;
  };
};
