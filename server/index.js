const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler");
const router = require("./src/routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
