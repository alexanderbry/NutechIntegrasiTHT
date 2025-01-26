const { Router } = require("express");

const profileRouters = require("./profileRouters");
const transactionRouters = require("./transactionRouters");
const errorHandler = require("../middleware/errorHandler");
const membershipController = require("../controllers/membershipController");
const authentication = require("../middleware/authentication");
const informationController = require("../controllers/informationController");
const transactionController = require("../controllers/transactionController");

const router = Router();

// Public API
router.post("/registration", membershipController.register);
router.post("/login", membershipController.login);

// Private API
router.use(authentication);

router.use("/profile", profileRouters);

router.get("/banner", informationController.getAllBanner);
router.get("/service", informationController.getAllService);

router.get("/balance", transactionController.getBalance);
router.post("/topup", transactionController.topupBalance);

router.use("/transaction", transactionRouters);

router.use(errorHandler);

module.exports = router;
