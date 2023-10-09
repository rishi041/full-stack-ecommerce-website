const pool = require("../../db");
const queries = require("./queries");

const getProducts = (req, res) => {
  pool.query(queries.getProducts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getProductById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addProducts = (req, res) => {
  const { name, email, age, dob } = req.body;

  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists");
      return;
    }

    //add student to db
    pool.query(
      queries.addProducts,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Student Created Successfully!");
      }
    );
  });
};

const removeProduct = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getProductById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the database.");
      return;
    }

    pool.query(queries.removeProduct, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student removed successfully");
    });
  });
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getProductById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the database.");
      return;
    }

    pool.query(queries.updateProduct, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student updated successfully");
    });
  });
};

module.exports = {
  getProducts,
  getProductById,
  addProducts,
  removeProduct,
  updateProduct,
};
