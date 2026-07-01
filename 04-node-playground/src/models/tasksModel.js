const pool = require("../db/pool");

async function getTasksModel() {
  const result = await pool.query(`SELECT * FROM tasks`);
  return result.rows;
}

async function getTaskModel(taskId) {
  const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [
    taskId,
  ]);

  return result.rows[0];
}

async function createTaskModel(name, description) {
  const result = await pool.query(
    `INSERT INTO tasks (name, description) VALUES ($1, $2) RETURNING id, name, description`,
    [name, description],
  );

  return result.rows[0];
}

async function updateTaskModel(name, description, taskId) {
  const result = await pool.query(
    `
    UPDATE tasks SET name = $1, description = $2 WHERE id = $3 RETURNING id, name, description`,
    [name, description, taskId],
  );

  return result.rows[0];
}

async function deleteTaskModel(taskId) {
  const result = await pool.query(
    `
    DELETE FROM tasks WHERE id = $1 RETURNING *`,
    [taskId],
  );

  return result.rows[0];
}

module.exports = {
  getTasksModel,
  getTaskModel,
  createTaskModel,
  updateTaskModel,
  deleteTaskModel,
};
