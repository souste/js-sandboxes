const pool = require("../db/pool");

// async function getPostsAndCommentCountByUser(userId) {
//   const result = await pool.query(`
//     SELECT p.title, p.content, u.username, COUNT(c.id) AS comment_count FROM posts WHERE user_id = $1`, [
//     userId,
//   ]);

//   return result.rows;
// }

// async function getCommentsByPost(postId) {
//   const result = await pool.query(`SELECT * FROM comments WHERE post_id = $1`, [
//     postId,
//   ]);

//   return result.rows;
// }

async function getPostByIdModel(postId) {
  const result = await pool.query(`SELECT * FROM posts WHERE id = $1`, [
    postId,
  ]);
  return result.rows[0];
}

async function createPostModel(title, content, userId) {
  const result = await pool.query(
    `INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`,
    [title, content, userId],
  );

  return result.rows[0];
}

async function createCommentByPostModel(content, postId, userId) {
  const result = await pool.query(
    `INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3) RETURNING *`,
    [content, postId, userId],
  );

  return result.rows[0];
}

module.exports = {
  //   getPostsByUser,
  //   getCommentsByPost,
  getPostByIdModel,
  createPostModel,
  createCommentByPostModel,
};
