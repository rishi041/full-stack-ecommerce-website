const getAllUsersDb = "SELECT * FROM users";
const getStudentById = "SELECT * FROM students WHERE id = $1";
const checkEmailExists = "SELECT * FROM users WHERE email = $1";
const createUserDb = `INSERT INTO users(username, password, email, fullname) 
  VALUES($1, $2, $3, $4) 
  returning user_id, username, email, fullname, roles, address, city, state, country, created_at`;
const deleteUserDb = "DELETE FROM users where user_id = $1 returning *";
const updateUserDb = `UPDATE users set username = $1, email = $2, fullname = $3, address = $4, city = $5, state = $6, country = $7 
where user_id = $8 returning username, email, fullname, user_id, address, city, country, state`;

module.exports = {
  getAllUsersDb,
  getStudentById,
  checkEmailExists,
  createUserDb,
  deleteUserDb,
  updateUserDb,
};
