import jwt from "jsonwebtoken";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";

const verifyJwt = AsyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // console.log("token from authmidleware", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, " invalid access token");
    }

    req.user = user;
    req.token = token;
    req.userId = user._id;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid access token");
  }
});

export { verifyJwt };
