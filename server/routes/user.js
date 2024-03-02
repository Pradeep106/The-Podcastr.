const router = require("express").Router();
const { createUser, login } = require("../controller/createUser");

router.post("/signup", createUser);
router.post("/login", login);

module.exports = router;
