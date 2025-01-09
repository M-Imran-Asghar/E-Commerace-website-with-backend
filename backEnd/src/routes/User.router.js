import { Router } from "express";
import { upload } from "../middlewares/Multer.js";
import { userRegister, Userlogin, UserLogout, UserUpdate, newRefreshToken, changePassword, changeAvatar, getCurrentUser } 
from "../controllers/User.controller.js"
import { verifyJwt } from "../middlewares/Auth.middleware.js"

const router = Router()


router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]), userRegister)

router.route("/login").post(Userlogin)
router.route("/logout").post(verifyJwt, UserLogout)
router.route("/updateUser").patch(verifyJwt, UserUpdate)
router.route("/refreshToken").post(verifyJwt, newRefreshToken)
router.route("/changePassword").post(verifyJwt, changePassword)
router.route("/changeAvatar").patch(verifyJwt, upload.single("avatar"), changeAvatar)
router.route("/getCurrentUser").get(verifyJwt, getCurrentUser) 

export default router