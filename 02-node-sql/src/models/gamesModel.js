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

async function getGamesByDevelopersModel() {
  const result = await pool.query(
    `SELECT d.name, g.title
         FROM developers d
         LEFT JOIN games g
         ON d.id = g.developer_id`,
  );
  return result.rows;
}

async function getDevelopersGamesAndHeroesModel() {
  const result = await pool.query(
    `SELECT d.name AS developer_name, g.title AS game_title, h.name AS hero_name
        FROM developers d
        LEFT JOIN games g
        on d.id = g.developer_id
        LEFT JOIN heroes h
        ON g.id = h.game_id`,
  );

  return result.rows;
}

module.exports = {
  getGamesModel,
  createGamesModel,
  updateGamesModel,
  deleteGamesModel,
  getGamesByDevelopersModel,
  getDevelopersGamesAndHeroesModel,
};
