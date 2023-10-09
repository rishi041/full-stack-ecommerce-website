const getProducts = "SELECT * FROM products";
const getProductById = "SELECT * FROM students WHERE id = $1";
const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";
const addProducts =
  "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";
const removeProduct = "DELETE FROM students WHERE id = $1";
const updateProduct = "UPDATE students SET name = $1 WHERE id = $2";

module.exports = {
  getProducts,
  getProductById,
  checkEmailExists,
  addProducts,
  removeProduct,
  updateProduct,
};
