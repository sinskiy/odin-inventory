require("dotenv").config();
const path = require("node:path");
const express = require("express");
const itemsRouter = require("./routes/itemsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/categories", categoriesRouter);
app.use("/()(items)?", itemsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(process.env.PORT, () =>
  console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`),
);
