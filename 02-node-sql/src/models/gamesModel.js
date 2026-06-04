const pool = require("../db/pool");

async function getGamesModel() {
  const result = await pool.query(`SELECT * FROM games`);

  return result.rows;
}

async function createGamesModel(title, developerId) {
  const result = await pool.query(
    `INSERT INTO games (title, developer_id) VALUES ($1, $2) RETURNING id, title, developer_id`,
    [title, developerId],
  );

  return result.rows[0];
}

async function updateGamesModel(title, developerId, id) {
  const result = await pool.query(
    `UPDATE games SET title = $1, developer_id = $2 WHERE id = $3  RETURNING id, title, developer_id`,
    [title, developerId, id],
  );

  return result.rows[0];
}

async function deleteGamesModel(id) {
  const result = await pool.query(
    `DELETE FROM games WHERE id = $1 RETURNING id`,
    [id],
  );

  return result.rows[0];
}

module.exports = {
  getGamesModel,
  createGamesModel,
  updateGamesModel,
  deleteGamesModel,
};
