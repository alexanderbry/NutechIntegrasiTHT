const { Router } = require("express");

const profileRouters = require("./profileRouters");
const transactionRouters = require("./transactionRouters");
const errorHandler = require("../middleware/errorHandler");
const membershipController = require("../controllers/membershipController");
const authentication = require("../middleware/authentication");

const router = Router();

// Public API
router.post("/registration", membershipController.register);
router.post("/login", membershipController.login);

// Private API
router.use(authentication);

router.use("/profile", profileRouters);
router.use("/transaction", transactionRouters);

router.use(errorHandler);

module.exports = router;
