import { Store } from "../models/Store.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const createStore = async (req, res) => {
   try {
     const { storeName } = req.body
     
     
 
     if([storeName].some(
         (field) => field?.trim() === ""
       )){
         throw new ApiError(400, "Store name is required")
     }
 
     const existedStore = await Store.findOne({storeName})
     if(existedStore){
         throw new ApiError(409, "Store Already Exist")
     }
     const storeImagePath = req.files?.storeImage?.[0]?.path
     
     const storeImage = await uploadOnCloudinary(storeImagePath)
    
 
     const storeOwnerName = req.user?.userName
     const storeOwnerId = req.user?._id
 
     const store = await Store.create({
         storeName,
         storeImage: storeImage.url,
         storeOwner: storeOwnerName,
         storeOwnerId: storeOwnerId
 
     })
 
     if(!store){
         throw new ApiError(401, "Store Not created")
     }
 
     return res
     .status(201)
     .json(
         new Apiresponse(201, "Store Created successfully", store)
     )
   } catch (error) {
    console.log("error ehile creating store", error);   
    
   }
}




  



export { createStore }