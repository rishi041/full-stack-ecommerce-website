const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getAllUsersDb);
router.post("/", controller.createUserDb);
router.put("/:id", controller.updateUserDb);
router.delete("/:id", controller.deleteUserDb);

module.exports = router;
