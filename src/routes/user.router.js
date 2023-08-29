const express = require("express");
const router = express.Router();

const { updateUser, deleteUser, getAllUsers, getUser } = require("../controllers/user.controller");
const { adminAuth } = require("../middlewares/auth");
router.route("/getUser/:id").get(adminAuth, getUser);
router.route("/getAllUsers").get(adminAuth, getAllUsers);
router.route("/updateUser/:id").put(adminAuth, updateUser);
router.route("/deleteUser/:id").delete(adminAuth, deleteUser);

module.exports = router;
