import mongoose from "mongoose";
import { Product } from "../models/Product.model.js";
import { Store } from "../models/Store.model.js"
import { ApiError } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const addProducts = AsyncHandler(async (req, res) => {
  try {
    const { productName, discription, productPrice, storeOwnerId } = req.body;
    //   console.log(productName);

    if (
      [productName, discription, productPrice].some(
        (fields) => fields?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All product fields is required");
    }

    const productImagesPath = req.files?.productImages[0]?.path;
    if (!productImagesPath) {
      throw new ApiError(400, "productImage path is missing");
    }

    const productImages = await uploadOnCloudinary(productImagesPath);
    if (!productImages) {
      throw new ApiError(400, "product Image is required");
    }

    const userId = req.user?._id;
    const userName = req.user?.userName;
    if (!userName) {
      throw new ApiError(401, "user id is missing");
    }


    // console.log(req.user);

    const product = Product.create({
      productName,
      discription,
      productPrice,
      productImages: productImages.url,
      productOwner: userName,
      productOwnerId: userId,
      
    });
    if (!product) {
      throw new ApiError(400, "product not created");
    }

    return res
      .status(201)
      .json(new Apiresponse(201, "Product created successfully"));
  } catch (error) {
    console.log("error while creating products", error);
  }
});

const getAllProducts = AsyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { createdAt: -1 },
  };

  const products = await Product.paginate({}, options);
  if (!products || products.docs.length === 0) {
    throw new ApiError(401, " products not found");
  }

  return res.status(200).json(
    // new Apiresponse(200, [products.docs], "get products successfully")

    products.docs
  );
});

const getProductById = AsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "product not found");
  }

  return res
    .status(200)
    .json(new Apiresponse(200, product, "product is get successfully"));
});

const updateProducts = AsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const { productName, discription, productPrice } = req.body;
  if (!productName || !discription || !productPrice) {
    throw new ApiError(400, "all fields are required");
  }

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        productName,
        productPrice,
        discription,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new Apiresponse(200, product, "product update successfully"));
});

const deleteProducts = AsyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    throw new ApiError(400, " product id no found");
  }

  const product = await Product.findByIdAndDelete(productId);

  return res
    .status(200)
    .json(new Apiresponse(200, "product delete successfully"));
});


export {
  addProducts,
  getAllProducts,
  updateProducts,
  deleteProducts,
  getProductById,
  
};
