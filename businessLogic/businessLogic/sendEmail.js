module.exports = function(app) {
  require("../util/errorHelpers");
  require("../modelCRUD/user")(app);
  require("../messageServices")(app);

  this.postEmail = async body => {
    const user = await getUserByUuid(body.userUuid);

    if (!user.email) {
      throwError(400, "Email Service Error", "No email provided")();
    } else if (!body.message || !body.subject) {
      throwError(
        400,
        "Email Service Error",
        "No message or subject provided"
      )();
    }

    initEmailService();

    const result = await sendEmailService(
      process.env.REACT_EMAIL_user,
      user.email,
      body.subject,
      body.message
    );
    return result;
  };
};
