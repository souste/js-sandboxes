const pool = require("../db/pool");

async function getContactsModel() {
  const result = await pool.query(`
    SELECT c.id, c.first_name, c.surname, c.email, co.name AS company_name, co.industry
    FROM contacts c
    LEFT JOIN companies co ON c.company_id = co.id
    ORDER BY c.id ASC
        `);

  return result.rows;
}

async function getContactModel(id) {
  const result = await pool.query(
    `
    SELECT c.id, c.first_name, c.surname, c.email, co.name AS company_name, co.industry
    FROM contacts c
    LEFT JOIN companies co ON c.company_id = co.id
    WHERE c.id = $1`,
    [id],
  );

  return result.rows[0];
}

async function createContactModel(firstName, surname, email, companyId) {
  const result = await pool.query(
    `
        INSERT INTO contacts (first_name, surname, email, company_id) VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
    [firstName, surname, email, companyId],
  );
  return result.rows[0];
}

module.exports = {
  getContactsModel,
  getContactModel,
  createContactModel,
};
