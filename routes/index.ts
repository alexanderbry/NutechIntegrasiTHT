import { Router } from "express";

import { profileRouters } from "./profileRouters";
import { transactionRouters } from "./transactionRouters";

export const router = Router();

router.use("/profile", profileRouters);
router.use("/transaction", transactionRouters);