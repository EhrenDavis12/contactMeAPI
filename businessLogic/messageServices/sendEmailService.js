module.exports = function(app) {
  const nodemailer = require("nodemailer");
  require("../util/errorHelpers");
  let transporter;

  this.initEmailService = async (service, emailAddress, password) => {
    transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: emailAddress,
        pass: password
      }
    });
  };

  this.sendEmailService = async (from, to, subject, text) => {
    const mailOptions = { from, to, subject, text };

    const result = await transporter.sendMail(mailOptions, function(
      error,
      info
    ) {
      if (error) {
        throwError(null, "Email Service Error")(error);
      } else {
        console.log("Email sent: " + info.response);
        return info;
      }
    });

    return result;
  };
};
