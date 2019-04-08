module.exports = function(app) {
  require("../util/errorHelpers");
  const client = require("twilio")(
    process.env.REACT_TWILIO_accountSid,
    process.env.REACT_TWILIO_authToken
  );
  const whatsAppBody = {
    body: "",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+19153294416"
  };

  this.sendWhatsAppOrderNotification = async () => {
    const postJson = {
      ...whatsAppBody,
      body:
        "Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/"
    };
    const result = await makeWhatsAppCall(postJson);
    return result;
  };

  this.sendWhatsAppAppointmentReminders = async () => {
    const postJson = {
      ...whatsAppBody,
      body: "Your appointment is coming up on July 21 at 3PM"
    };
    const result = await makeWhatsAppCall(postJson);
    return result;
  };

  this.sendWhatsApp2wayMessage = async () => {
    const postJson = {
      ...whatsAppBody,
      body:
        "Hello! This is an editable text message. You are free to change it and write whatever you like."
    };
    const result = await makeWhatsAppCall(postJson);
    return result;
  };

  this.makeWhatsAppCall = async postJson => {
    const result = await client.messages
      .create(postJson)
      .then(this.handleMessageError);
    //.done();
    return result;
  };

  this.handleMessageError = async message => {
    if (message.errorCode) {
      throwError(message.errorCode, "WhatsApp Error", message.errorMessage)();
    } else {
      return message;
    }
  };
};
