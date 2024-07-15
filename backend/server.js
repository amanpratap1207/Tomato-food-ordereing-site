import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodroute.js";
import userRouter from "./routes/userRoute.js";

import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config:
const app = express();

// port number where server will be running:
const port = 4000;

// Middleware:
app.use(express.json());      /* request from Frontend to Backend will be pass through this json */
app.use(cors())               /* we can access the backend from any frontend */



// db connection:
connectDB();

// api endpoints:
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


app.get("/", (req, res)=>{             /* get(): It's a HTTP Method through that we can request the data from server. */                   
    res.send("API Working");
}); 

// To run the express server:
app.listen(port, () =>{
    console.log(`Server Started on http://localhost:${port}`);
})

