import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}))

import userRouter from "./routes/User.router.js"
app.use("/api/v1/users", userRouter)

import productsRouter from "./routes/Product.router.js"
app.use("/api/v1/products", productsRouter)

import orderRouter from "./routes/Order.router.js"
app.use("/api/v1/orders", orderRouter)





export { app }