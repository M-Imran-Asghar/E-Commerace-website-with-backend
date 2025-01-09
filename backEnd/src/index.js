import connectDB from "./db/MongoDB.js"
import  dotenv  from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path: "./.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`server is runing at port: ${process.env.PORT}`);
        
    })
}).catch((err)=>{
    console.log("server running fail", err);
    
})