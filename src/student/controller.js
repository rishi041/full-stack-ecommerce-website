const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudents = (req, res) => {
  const { name, email, age, dob } = req.body;

  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists");
      return;
    }

    //add student to db
    pool.query(
      queries.addStudents,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Student Created Successfully!");
      }
    );
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the database.");
      return;
    }

    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student removed successfully");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the database.");
      return;
    }

    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student updated successfully");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudents,
  removeStudent,
  updateStudent,
};
