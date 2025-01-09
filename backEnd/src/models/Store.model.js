import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        storeOwner:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            type: String
        },
        storeOwnerId:{
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        storeName:{
            type: String,
            required: true,
            index: true,
            trim: true, 
            unique: true           
        },
        storeImage:{
            type: String
        }, 
    }
)

export const Store = mongoose.model("Store", storeSchema)