const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../db");
const queries = require("./queries");
const salt = 10;

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
  const { username, email, fullname } = req.body;

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hassing password" });

    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
      if (results.rows.length) {
        res.send("Email already exists");
        return;
      }

      // add user to db
      pool.query(
        queries.createUserDb,
        [username, hash, email, fullname],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Student Created Successfully!");
        }
      );
    });
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

const userAuthentication = (req, res) => {
  const { email } = req.body;

  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) return res.json({ Error: "Login error in server" });
    if (results.rows.length) {
      bcrypt.compare(
        req.body.password.toString(),
        results.rows[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            jwt.sign(
              { email },
              "secret-key",
              { expiresIn: "300s" },
              (err, token) => {
                return res.json({ Status: "Success", token });
              }
            );
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "No email existed" });
    }
  });
};

const verifyToken = (req, res) => {
  jwt.verify(req.token, "secret-key", (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      res.json({ message: "Success", authData });
    }
  });
};

function tokenExtractor(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({ result: "Token is not valid" });
  }
}

module.exports = {
  getAllUsersDb,
  getStudentById,
  createUserDb,
  deleteUserDb,
  updateUserDb,
  userAuthentication,
  verifyToken,
  tokenExtractor,
};
