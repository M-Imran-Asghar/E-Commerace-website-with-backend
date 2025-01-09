import mongoose from "mongoose";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"


const  userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            
        },
        address:{
            type: String,
            required: true,
                       
        },
        mobile:{
            type: Number,
            required: true
        },
        identity:{
            type: Number,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        avatar:{
            type: String,
            required: true 
        }, 
        refreshToken:{
            type: String
        }

    },
    {
        timestamps:true
    })

    userSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next()
       this.password = await bcrypt.hash(this.password, 10)
        next()
    })

    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password)
    }

    userSchema.methods.genrateAccessToken = function() {
        return jwt.sign(
            {
                _id: this._id,
                userName: this.userName,
                email: this.email,
            },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }

    userSchema.methods.genrateRefreshToken = function() {
        return jwt.sign(
            {
                _id: this._id,
               
            },
            process.env.REFRESH_TOKEN_KEY,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }

export const User = mongoose.model("User", userSchema)


