const { getUsers } = require("./randomUserApi");

const syncUsers = async (num) => {
  const result = await getUsers(num);

  const users = result.results;

  const contacts = users.map((user) => {
    return {
      first_name: user.name.first,
      surname: user.name.last,
      email: user.email,
    };
  });

  return contacts;
};

module.exports = { syncUsers };
