const { getContactModel } = require("../models/contactsModel");

const handleWebhook = async (payload) => {
  const { event, contactId } = payload;

  if (!event || !contactId) {
    throw new Error("Invalid webhook payload");
  }

  if (event !== "contact.updated") {
    throw new Error("Unsupported event");
  }

  const contact = await getContactModel(contactId);

  if (!contact) {
    throw new Error("Contact not found");
  }

  console.log(`Webhook received: ${event} for contact ${contactId}`);

  return {
    event,
    contactId,
    status: "processed",
  };
};

module.exports = {
  handleWebhook,
};
