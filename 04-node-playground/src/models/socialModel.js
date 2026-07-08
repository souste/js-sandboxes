const pool = require("../db/pool");

async function getAllUsersModel() {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}

async function getPostsAndCommentCountByUserModel(userId) {
  const result = await pool.query(
    `
    SELECT u.username, p.id, p.title, p.content, COUNT(c.id) as comment_count 
    FROM users u
    JOIN posts p ON u.id = p.user_id
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE u.id = $1
    GROUP BY u.username, p.id, p.title, p.content
    `,
    [userId],
  );

  return result.rows;
}

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
  getAllUsersModel,
  getPostsAndCommentCountByUserModel,
  getPostByIdModel,
  createPostModel,
  createCommentByPostModel,
};
