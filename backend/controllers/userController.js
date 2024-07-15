import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user:
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        // if there is any user or not:
        if (!user) {
            return res.json({success:false, message:"User Doesn't Exist"})
        }

        // matches users_password with store_password:
        const isMatch = await bcrypt.compare(password, user.password);
        // password doesn't matches:
        if (!isMatch) {
            return res.json({success:false, message:"Invalid Credentials"});
        }

        //if the password matches, generate a token & send a response:
        const token = createToken(user._id);
        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// Create a token:
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// new user / register user:
const registerUser = async(req, res) => {
    const {name, password, email} = req.body;
    try {
        // checking whether the user already exists.
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User Already Exists"})
        }

        // validating email format and strong password:
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please Enter a Valid Email"})
        }

        // To enter a strong password:
        if (password.length<8) {
            return res.json({success:false, message:"Please Enter a Strong Password"})
        }

        // hashing user password(encrypting the password):
        const salt = await bcrypt.genSalt(10);  // (5-15) higher the value, stronger password acc. to number
        const hashedPassword = await bcrypt.hash(password, salt);

        // New_User:
        const newUser = new userModel ({
            name:name,
            email:email,
            password:hashedPassword
        })
        
        // we need save the new user in the database:
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {loginUser, registerUser}