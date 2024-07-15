import express from "express"

import { addFood, listFood, removeFood } from "../controllers/foodController.js"

import multer from "multer"    // image storage system


const foodRouter = express.Router();

// Image Storage Engine - disk storage configuration
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

// upload middleware - through this we can storage the image in upload folder
const upload = multer({storage:storage})


// Post Request:
// These are the endpoints - 
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);


export default foodRouter;