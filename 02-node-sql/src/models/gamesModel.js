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

async function getDevelopersWithNoGamesModel() {
  const result = await pool.query(
    `SELECT d.name AS developer_name
     FROM developers d
     LEFT JOIN games g
     ON d.id = g.developer_id
     WhERE g.developer_id IS NULL`,
  );
  return result.rows;
}

async function getTotalCharacterCensusModel() {
  const result = await pool.query(
    `SELECT g.title, 
     s.metascore, 
     s.userscore, 
     JSON_AGG(DISTINCT h.name) FILTER (WHERE h.name IS NOT NULL) AS heros, 
     JSON_AGG(DISTINCT v.name) FILTER (WHERE v.name IS NOT NULL) AS villains
     FROM games g
     LEFT JOIN scores s ON g.id = s.game_id
     LEFT JOIN heroes h ON g.id = h.game_id
     LEFT JOIN villains v ON g.id = v.game_id
     GROUP BY g.id, g.title, s.metascore, s.userscore
     
     `,
  );
  return result.rows;
}

async function getTotalGameScoreModel() {
  const result = await pool.query(
    `SELECT title, s.metascore, s.userscore, 
     (COALESCE(s.metascore, 0) + (COALESCE(s.userscore, 0) * 10))::INTEGER AS total_score, 
     ROUND((COALESCE(s.metascore, 0) + (COALESCE(s.userscore, 0) * 10)) / 2) AS average_score
     FROM games g
     LEFT JOIN scores s ON g.id = s.game_id`,
  );

  return result.rows;
}

async function getGamesByPlatformModel(platform) {
  const result = await pool.query(
    `SELECT g.title, p.name AS platform
   FROM game_platforms gp
   JOIN platforms p ON gp.platform_id = p.id
   JOIN games g ON gp.game_id = g.id
   WHERE p.name = $1
   ORDER BY g.title ASC
  `,
    [platform],
  );
  return result.rows;
}

async function getGamesWithoutScoresModel() {
  const result = await pool.query(
    `SELECT g.title, s.metascore, s.userscore
    FROM games g
    JOIN scores s ON g.id = s.game_id
    WHERE s.metascore IS NULL OR s.userscore IS NULL`,
  );

  return result.rows;
}

async function getTopFiveGamesModel() {
  const result = await pool.query(
    `SELECT title, ROUND((COALESCE(s.metascore, 0) + (COALESCE(s.userscore, 0) * 10)) / 2) AS average_score
    FROM games g
    LEFT JOIN scores s on g.id = game_id
    ORDER BY average_score DESC
    LIMIT 5`,
  );

  return result.rows;
}

async function getLowestFiveGamesModel() {
  const result = await pool.query(
    `SELECT title, ROUND((COALESCE(s.metascore, 0) + (COALESCE(s.userscore, 0) * 10)) / 2) AS average_score
    FROM games g
    LEFT JOIN scores s on g.id = game_id
    ORDER BY average_score ASC
    LIMIT 5`,
  );

  return result.rows;
}

async function getPlatformRosterModel() {
  const result = await pool.query(
    `SELECT p.name, JSON_AGG(g.title) AS games_list, ROUND(AVG(s.metascore + (s.userscore * 10) ) /2) AS avg_platform_score
     FROM game_platforms gp
     JOIN platforms p ON gp.platform_id = p.id
     JOIN games g ON gp.game_id = g.id
     JOIN scores s ON g.id = s.game_id
     GROUP BY p.name
     ORDER BY avg_platform_score DESC
    `,
  );
  return result.rows;
}

async function getHighScoreFilterModel() {
  const result = await pool.query(
    `SELECT g.title, s.metascore
    FROM games g
    JOIN scores s ON g.id = s.game_id
    WHERE s.metascore > (SELECT AVG(metascore) FROM scores)`,
  );

  return result.rows;
}

async function getScoreDensityModel() {
  const result =
    await pool.query(`SELECT COUNT(metascore) AS score_count FROM scores
    WHERE metascore IS NOT NULL`);

  return parseInt(result.rows[0].score_count);
}

async function getMissingScoresModel() {
  const result = await pool.query(`
    SELECT g.title
    FROM games g
    LEFT JOIN scores s ON g.id = s.game_id
    WHERE s.game_id IS NULL`);

  return result.rows;
  console.log("poopy");
}

async function getPlatformWithMostGamesModel() {
  const result = await pool.query(`
    SELECT p.name, COUNT(gp.game_id) AS number_of_games
    FROM platforms p
    JOIN game_platforms gp ON p.id = gp.platform_id
    GROUP BY p.name
    ORDER BY number_of_games DESC
    LIMIT 1;
    `);

  return result.rows[0] || null;
}

async function getPlatformCatalogueModel() {
  const result = await pool.query(`
    SELECT p.name, COUNT(gp.game_id) AS game_count
    FROM platforms p
    LEFT JOIN game_platforms gp ON p.id = gp.platform_id
    GROUP BY p.name
    ORDER BY game_count DESC
    `);

  return result.rows;
}

async function getHighestScoreByPlatformModel() {
  const result = await pool.query(`
    SELECT p.name, MAX(s.metascore) AS highest_metascore
    FROM platforms p
    LEFT JOIN game_platforms gp ON p.id = gp.platform_id 
    LEFT JOIN games g ON gp.game_id = g.id
    LEFT JOIN scores s ON g.id = s.game_id
    GROUP BY p.name
    ORDER BY highest_metascore DESC
    `);

  return result.rows;
}

module.exports = {
  getGamesModel,
  createGamesModel,
  updateGamesModel,
  deleteGamesModel,
  getGamesByDevelopersModel,
  getDevelopersGamesAndHeroesModel,
  getDevelopersWithNoGamesModel,
  getTotalCharacterCensusModel,
  getTotalGameScoreModel,
  getGamesByPlatformModel,
  getGamesWithoutScoresModel,
  getTopFiveGamesModel,
  getLowestFiveGamesModel,
  getPlatformRosterModel,
  getHighScoreFilterModel,
  getScoreDensityModel,
  getMissingScoresModel,
  getPlatformWithMostGamesModel,
  getPlatformCatalogueModel,
  getHighestScoreByPlatformModel,
};
