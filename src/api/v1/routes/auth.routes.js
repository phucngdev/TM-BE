const AuthRoutes = require("express").Router();
const authController = require("../controllers/auth.controller");
const authValidate = require("../validations/auth.validate");

AuthRoutes.post("/register", authValidate.register, authController.register);
AuthRoutes.post("/login", authController.login);
AuthRoutes.post("/refresh-token", authController.login);

module.exports = { AuthRoutes };
