const express = require("express");
const studentRoutes = require("./src/student/routes");
const productRoutes = require("./src/products/routes");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/products", productRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
