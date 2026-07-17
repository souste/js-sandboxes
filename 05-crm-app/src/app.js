require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Welcome to the CRM app" }));

const contactsRoutes = require("./routes/contactsRoutes");
const syncRoutes = require("./routes/syncRoutes");

app.use("/contacts", contactsRoutes);
app.use("/sync", syncRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}`);
});
