const express = require("express");
const studentRoutes = require("./src/student/routes");
const productRoutes = require("./src/products/routes");
const usersRoutes = require("./src/users/routes");

const cors = require("cors");

const app = express();

app.use(cors());

const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", usersRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
