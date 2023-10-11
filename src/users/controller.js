const pool = require("../../db");
const queries = require("./queries");

const getAllUsersDb = (req, res) => {
  pool.query(queries.getAllUsersDb, (error, results) => {
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

const createUserDb = (req, res) => {
  const { username, password, email, fullname } = req.body;

  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    console.log(results, "QWERTY");
    if (results.rows.length) {
      res.send("Email already exists");
      return;
    }

    // add user to db
    pool.query(
      queries.createUserDb,
      [username, password, email, fullname],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Student Created Successfully!");
      }
    );
  });
};

const deleteUserDb = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the database.");
      return;
    }

    pool.query(queries.deleteUserDb, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student removed successfully");
    });
  });
};

const updateUserDb = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the database.");
      return;
    }

    pool.query(queries.updateUserDb, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student updated successfully");
    });
  });
};

module.exports = {
  getAllUsersDb,
  getStudentById,
  createUserDb,
  deleteUserDb,
  updateUserDb,
};
