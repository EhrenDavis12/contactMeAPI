module.exports = function(app) {
  require("../util/errorHelpers");
  const client = require("twilio")(
    process.env.REACT_TWILIO_accountSid,
    process.env.REACT_TWILIO_authToken
  );
  const whatsAppBody = {
    body: "",
    from: "whatsapp:+" + process.env.REACT_TWILIO_phone,
    to: "",
    Prefix: "whatsapp:+"
  };

  /* this.sendWhatsAppOrderNotification = async To => {
    const postJson = {
      ...whatsAppBody,
      body:
        "Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/",
      to: this.handleTo(To)
    };
    const result = await makeWhatsAppCall(postJson);
    return result;
  }; */

  /* this.sendWhatsAppAppointmentReminders = async (message, To) => {
    const postJson = {
      ...whatsAppBody,
      body: message
        ? message
        : "Your appointment is coming up on July 21 at 3PM",
      to: this.handleTo(To)
    };
    const result = await makeWhatsAppCall(postJson);
    return result;
  }; */

  /* this.sendWhatsApp2wayMessage = async To => {
    const postJson = {
      ...whatsAppBody,
      body:
        "Hello! This is an editable text message. You are free to change it and write whatever you like.",
      to: this.handleTo(To)
    };
    const result = await makeWhatsAppCall(postJson);
    return result;
  }; */

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
      ? whatsAppBody.Prefix + To
      : whatsAppBody.Prefix + process.env.REACT_whatsApp_from;
  };
};
