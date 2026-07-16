const pool = require("../db/pool");

async function getContactsModel() {
  const result = await pool.query(`
    SELECT c.id, c.first_name, c.surname, c.email, co.name AS company_name, co.industry
    FROM contacts c
    LEFT JOIN companies co ON c.company_id = co.id
        `);

  return result.rows;
}

module.exports = {
  getContactsModel,
};
