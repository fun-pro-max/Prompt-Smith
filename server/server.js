require("dotenv").config();
const express = require("express");
const cors = require("cors");




const generateRoute = require("./routes/generate");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/generate", generateRoute);
const path = require("path");
app.use(express.static(path.join(__dirname, "../client")));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/builder.html"));
});
