import mongoose from "mongoose";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { Apiresponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const genrateAccessAndrefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.genrateAccessToken();
    const refreshToken = user.genrateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, " Error before genrating access and refresh token");
  }
};

const userRegister = AsyncHandler(async (req, res) => {
  const { userName, email, address, mobile, identity, password } = req.body;

  if (
    [userName, email, address, mobile, identity, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "required all fields");
  }
  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (existedUser) {
    throw new ApiError(409, " User Already Exist");
  }

  const localAvatarPath = req.files?.avatar[0]?.path;

  if (!localAvatarPath) {
    throw new ApiError(400, " Avatar path is not found");
  }
  const avatar = await uploadOnCloudinary(localAvatarPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = User.create({
    userName,
    email,
    address,
    mobile,
    identity,
    password,
    avatar: avatar.url,
  });

  const createdUser = User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  return res
    .status(201)
    .json(new Apiresponse(201, "User created successfully"));
});

const Userlogin = AsyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  // console.log(userName);

  if (!userName && !email) {
    throw new ApiError(400, "username and email required ");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  // console.log(user.userName);

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "your password not valid");
  }

  const { accessToken, refreshToken } = await genrateAccessAndrefreshToken(
    user._id
  );
  const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  // console.log("accessToken from user", accessToken);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      // new Apiresponse(200,
      //     {
      //         user: logedInUser, accessToken, refreshToken

      //     },
      //     "User login successfully"
      // )
      {
        msg: "Login successful",
        token: accessToken,
        refreshToken: refreshToken,
        logedInUser,
      }
    );
});

const UserLogout = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .json(new Apiresponse(200, {}, "User logout successfully"));
});

const newRefreshToken = AsyncHandler(async (req, res) => {
  const inComingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!inComingRefreshToken) {
    throw new ApiError(401, "inComing refresh token error");
  }

  const decodedToken = jwt.verify(
    inComingRefreshToken,
    process.env.REFRESH_TOKEN_KEY
  );

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "invalid refresh token ");
  }

  if (inComingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "refresh token expire");
  }

  const { accessToken, newRefreshToken } = await genrateAccessAndrefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new Apiresponse(
        200,
        {
          accessToken,
          refreshToken: newRefreshToken,
        },
        "refresh token created successfully"
      )
    );
});

const changePassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "invalid oldPassword");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new Apiresponse(200, {}, "password changed"));
});

const UserUpdate = AsyncHandler(async (req, res) => {
  const { userName, email } = req.body;

  if (!userName || !email) {
    throw new ApiError(401, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        userName,
        email,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  return res
    .status(200)
    .json(new Apiresponse(200, user, "email and username update successfully"));
});

const changeAvatar = AsyncHandler(async (req, res) => {
  const avatarLocalpath = req.file?.path;
  
  if (!avatarLocalpath) {
    throw new ApiError(400, "avatar path is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalpath);
  if (!avatar) {
    throw new ApiError(400, "avatar is missing");
  }

  const user = await User.findByIdAndUpdate(req.user?._id, {
    $set: {
      avatar: avatar.url,
    },
  }).select("-password");

  return res
    .status(200)
    .json(new Apiresponse(200, user, "Avatar changed successfully"));
});

const getCurrentUser = AsyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id).select("-password");
  // console.log(user);

  return res.status(200).json({ user });
});

export {
  userRegister,
  Userlogin,
  UserLogout,
  UserUpdate,
  newRefreshToken,
  changePassword,
  changeAvatar,
  getCurrentUser,
};
