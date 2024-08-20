require("dotenv").config();
const path = require("node:path");
const express = require("express");
const itemsRouter = require("./routes/itemsRouter");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", itemsRouter);

app.listen(process.env.PORT, () =>
  console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`),
);
