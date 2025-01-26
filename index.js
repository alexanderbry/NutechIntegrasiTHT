const express = require("express");
const dotenv = require("dotenv");
const router = require("./src/routes");
const errorHandler = require("./src/middleware/errorHandler");

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
