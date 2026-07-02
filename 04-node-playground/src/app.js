require("dotenv").config();

const express = require("express");
const pool = require("./db/pool");
const app = express();
app.use(express.json());

app.get("/", (req, res) =>
  res.json({ message: "Welcome to the Node Playground" }),
);

const tasksRoutes = require("./routes/tasksRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/tasks", tasksRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}`);
});
