import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema(
    {
        productOwner:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            type: String,
            required: true,
        },
        productOwnerId:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            type: String,
            required: true,
        },
        
        
        productName:{
            type: String,
            required: true,
            index: true,
            trim: true
        },
        discription:{
            type: String,
            required: true,
            trim: true
        },
        productPrice:{
            type: Number,
            required: true
        },
        productImages:[
            {
                type: String,
                required: true
            }
        ]

    },
    {
        timestamps:true
    }
)


productSchema.plugin(mongooseAggregatePaginate )


export const Product = mongoose.model("Product", productSchema)