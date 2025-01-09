import { Router } from "express";
import {
  addProducts,
  getAllProducts,
  updateProducts,
  deleteProducts,
  getProductById,
  
} from "../controllers/Product.controller.js";
import { upload } from "../middlewares/Multer.js";
import { verifyJwt } from "../middlewares/Auth.middleware.js";

const router = Router();
// router.use(verifyJwt)

router.route("/").get(getAllProducts);

router.route("/addProducts").post(
  verifyJwt,
  upload.fields([
    {
      name: "productImages",
      maxCount: 4,
    },
  ]),
  addProducts
);

router
  .route("/:productId")
  .get(verifyJwt, getProductById)
  .patch(verifyJwt, updateProducts)
  .delete(verifyJwt, deleteProducts);

export default router;
