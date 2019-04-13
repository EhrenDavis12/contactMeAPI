module.exports = function(app) {
  const nodemailer = require("nodemailer");
  require("../util/errorHelpers");
  let transporter;

  this.initEmailService = async () => {
    const auth = {
      type: "OAuth2",
      user: process.env.REACT_EMAIL_user,
      clientId: process.env.REACT_EMAIL_clientId,
      clientSecret: process.env.REACT_EMAIL_clientSecret,
      refreshToken: process.env.REACT_EMAIL_refreshToken
    };

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth
    });
  };

  this.sendEmailService = async (from, to, subject, text) => {
    try {
      const mailOptions = { from, to, subject, text };
      let result = await transporter
        .sendMail(mailOptions)
        .then(stuff => {
          console.log(stuff);
        })
        .catch(err => {
          throwError(null, "Email Service Error")(err);
        });
      return result;
    } catch (err) {
      throwError(null, "Email Service Error")(err);
    }
  };
};
