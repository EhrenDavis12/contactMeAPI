module.exports = function(app) {
  require("../util/errorHelpers");
  const client = require("twilio")(
    process.env.TWILIO_accountSid,
    process.env.TWILIO_authToken
  );
  const whatsAppPrefixNumber = "whatsapp:+";
  const whatsAppBody = {
    body: "",
    from: whatsAppPrefixNumber + process.env.TWILIO_phone,
    to: ""
  };

  this.sendWhatsAppMessage = async (message, To) => {
    const postJson = {
      ...whatsAppBody,
      body: message,
      to: this.handleTo(To)
    };

    if (!postJson.body) {
      throwError(400, "WhatsApp Error", "No message provided")();
    } else if (!postJson.to) {
      throwError(400, "WhatsApp Error", "To phone number not provided")();
    }

    const result = await makeWhatsAppCall(postJson);
    return result;
  };

  this.makeWhatsAppCall = async postJson => {
    const result = await client.messages
      .create(postJson)
      .then(returnResults())
      .catch(this.handleMessage);
    return result;
  };

  this.handleMessage = async error => {
    if (error.status) {
      const err = { ...error, status: error.code, code: error.status };
      throwError(err.code, "WhatsApp Error", err.message)(err);
    } else {
      return error;
    }
  };

  this.handleTo = To => {
    return To
      ? whatsAppPrefixNumber + To
      : whatsAppPrefixNumber + process.env.whatsApp_from;
  };
};
