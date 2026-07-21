const { getUsers } = require("./randomUserApi");
const {
  createContactModel,
  findContactByEmail,
} = require("../models/contactsModel");
const { isValidEmail } = require("../utils/validators");

const syncUsers = async (num) => {
  console.log("Starting contact sync...");

  const result = await getUsers(num);

  console.log(`Received ${result.results.length} users from API`);
  const received = result.results.length;

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

  let imported = 0;
  let rejected = 0;

  for (const contact of contacts) {
    if (
      !contact.first_name ||
      !contact.surname ||
      !contact.email ||
      !isValidEmail(contact.email)
    ) {
      console.log(`Skipping contact ${contact.email} - invalid data`);
      rejected++;
      continue;
    }
    const alreadyExists = await findContactByEmail(contact.email);
    if (alreadyExists) {
      console.log(`User with email: ${contact.email} already exists`);
      rejected++;
      continue;
    }

    await createContactModel(contact);
    imported++;
  }

  console.log("Contact sync complete:", {
    received,
    imported,
    rejected,
  });

  return {
    received,
    imported,
    rejected,
  };
};

module.exports = { syncUsers };
