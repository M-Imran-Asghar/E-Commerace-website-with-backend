import mongoose from "mongoose"
import { Order } from "../models/Order.model.js"
import { Product } from "../models/Product.model.js"
import { ApiError } from "../utils/ApiError.js"
import { Apiresponse } from "../utils/ApiResponse.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"


const createOrder = AsyncHandler( async(req, res ) =>{
    const { products, address} = req.body
    console.log("reqest body", req.body);
    

    if(!products || !Array.isArray(products) || products.length === 0){
        throw new ApiError(400, "no product specified in order")
    }

    let totalPrice = 0
    const validProducts = []

    for(const item of products){

        if(!item.product || !mongoose.Types.ObjectId.isValid(item.product)){
            throw new ApiError(400, `invalid product Id ${item.product}`)
        }
    const product = await Product.findById(item.product)  
    
    if(!product){
        throw new ApiError(404, `product with ID ${item.product} not found`)
    }

    const quantity = item.quantity || 1
    totalPrice += product.productPrice * quantity

    validProducts.push({
        product: product._id,
        quantity,
    })
    }

    const user = req.user
    if(!user){
        throw new ApiError(401, "user not authenticated" )
    }

    const order = await Order.create({
        user: user._id,
        products: validProducts,
        address,
        totalPrice
    })

    console.log("New Order Notification:");
  console.log("Customer Details:", {
    userName: user.userName,
    email: user.email,
    mobile: user.mobile,
  });
  console.log("Address Details:", address);
  console.log("Order Details:", order);

  return res
  .status(200)
  .json(
    new Apiresponse(
        200, order, "order created successfully"
    )
  )

})


export {
    createOrder
}
