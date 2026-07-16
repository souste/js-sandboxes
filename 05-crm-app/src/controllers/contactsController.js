const {
  getContactsModel,
  getContactModel,
  createContactModel,
} = require("../models/contactsModel");

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

const getContactController = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await getContactModel(id);

    if (!contact) {
      return res.status(404).json({
        success: true,
        message: `Unable to find contact with id ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
      message: `Successfully retrieved contact with id ${id}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createContactController = async (req, res) => {
  try {
    const { firstName, surname, email, companyId } = req.body;

    if (!firstName || !surname || !email || !companyId) {
      return res.status(400).json({
        success: false,
        message: "All fields must be complete",
      });
    }

    const result = await createContactModel(
      firstName,
      surname,
      email,
      companyId,
    );

    res.status(201).json({
      success: true,
      data: result,
      message: "Contact created successfuly",
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
  getContactController,
  createContactController,
};
