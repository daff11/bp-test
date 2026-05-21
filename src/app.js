const express = require("express");
const app = express();

app.use(express.json());

const materialRoutes = require("./routes/materialRoutes");
app.use("/materials", materialRoutes);

module.exports = app;