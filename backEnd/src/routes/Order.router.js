import { Router } from "express";
import { createOrder } from "../controllers/Order.controller.js"
import { verifyJwt } from "../middlewares/Auth.middleware.js";

const router = Router()
router.use(verifyJwt)


router.route("/Order").post(createOrder)



export default router