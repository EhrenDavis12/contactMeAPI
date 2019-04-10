module.exports = function(app) {
  const nodemailer = require("nodemailer");
  require("../util/errorHelpers");
  const promisify = require("util").promisify;
  let transporter;

  this.initEmailService = async (service, emailAddress, password) => {
    transporter = nodemailer.createTransport({
      service,
      auth: {
        user: emailAddress,
        pass: password
      }
    });
  };

  this.sendEmailService = async (from, to, subject, text) => {
    try {
      const sendMail_Promise = promisify(transporter.sendMail);
      const mailOptions = { from, to, subject, text };
      const result = await sendMail_Promise(mailOptions);
      return result;
    } catch (err) {
      throwError(null, "Email Service Error")(err);
    }
  };

  /* this.sendMail_Promise = mailOptions => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, handleError);
    });
  }; */
  /* 
  this.handleError = async (error, info) => {
    if (error) {
      throwError(null, "Email Service Error")(error);
    } else {
      console.log("Email sent: " + info.response);
      return info;
    }
  }; */
};
