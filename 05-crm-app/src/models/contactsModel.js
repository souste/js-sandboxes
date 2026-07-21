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

async function createContactModel(contact) {
  const result = await pool.query(
    `
    WITH new_contact AS (
     INSERT INTO contacts (first_name, surname, email, phone, company_id) VALUES ($1, $2, $3, $4, $5)
     RETURNING *
    )
     SELECT
     c.id, c.first_name, c.surname, c.email, c.phone, co.name AS company_name, co.industry
     FROM new_contact c
    LEFT JOIN companies co ON c.company_id = co.id
    `,
    [
      contact.first_name,
      contact.surname,
      contact.email,
      contact.phone,
      contact.company_id,
    ],
  );
  return result.rows[0];
}

async function updateContactModel(
  firstName,
  surname,
  email,
  companyId,
  contactId,
) {
  const result = await pool.query(
    `WITH updated_contact AS (
         UPDATE contacts SET first_name = $1, surname = $2, email = $3, company_id = $4
         WHERE id = $5
         RETURNING *
        )
        SELECT
        c.id, c.first_name, c.surname, c.email, co.name AS company_name, co.industry
        FROM updated_contact c
        LEFT JOIN companies co ON c.company_id = co.id
         `,
    [firstName, surname, email, companyId, contactId],
  );
  return result.rows[0];
}

async function deleteContactModel(id) {
  const result = await pool.query(
    `
        
        DELETE FROM contacts WHERE id = $1 RETURNING *`,
    [id],
  );

  return result.rows[0];
}

async function findContactByEmail(email) {
  const result = await pool.query(
    `
    SELECT * FROM contacts WHERE email = $1
    `,
    [email],
  );

  return result.rows[0];
}

module.exports = {
  getContactsModel,
  getContactModel,
  createContactModel,
  updateContactModel,
  deleteContactModel,
  findContactByEmail,
};
