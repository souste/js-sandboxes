const { getContactsModel } = require("../models/contactsModel");

const getContactsController = async (req, res) => {
  try {
    const contacts = await getContactsModel();

    if (contacts.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "There are no available contacts",
      });
    }

    res.status(200).json({
      success: true,
      data: contacts,
      message: "Contacts successfully retrieved",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getContactsController,
};
