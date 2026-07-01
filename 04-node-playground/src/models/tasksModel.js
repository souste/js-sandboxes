const pool = require("../db/pool");

async function getTasksModel() {
  const result = await pool.query(`SELECT * FROM tasks`);
  return result.rows;
}

async function createTaskModel(name, description) {
  const result = await pool.query(
    `INSERT INTO tasks (name, description) VALUES ($1, $2) RETURNING id, name, description`,
    [name, description],
  );

  return result.rows[0];
}

module.exports = {
  getTasksModel,
  createTaskModel,
};
