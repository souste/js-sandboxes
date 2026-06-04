require("dotenv").config();

const express = require("express");
const pool = require("./db/pool");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello to the SQL sandbox" }));

const gamesRoutes = require("./routes/gamesRoutes");

app.use("/games", gamesRoutes);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}`);
});
