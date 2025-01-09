import { Router } from "express";
import { createStore } from "../controllers/Store.controller.js";
import { verifyJwt } from "../middlewares/Auth.middleware.js";
import { upload } from "../middlewares/Multer.js";

const router = Router();

router.route("/store").post(
  verifyJwt,
  upload.fields([
    {
      name: "storeImage",
      maxCount: 1,
    }, 
  ]),
  createStore
);

export default router;
