const { getUsers } = require("./randomUserApi");
const { createContactModel } = require("../models/contactsModel");

const syncUsers = async (num) => {
  const result = await getUsers(num);

  const users = result.results;

  const contacts = users.map((user) => {
    return {
      first_name: user.name.first,
      surname: user.name.last,
      email: user.email,
      phone: user.phone,
      company_id: 1,
    };
  });

  for (const contact of contacts) {
    await createContactModel(contact);
  }

  return contacts;
};

module.exports = { syncUsers };
