// middleware use to decode the token and convert it into userId:

import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    // whether we got the token or not:
    if (!token) {
        return res.json({success:false, message:"Not Authorized Login Again "})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        // recall back function:
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }

}


export default authMiddleware;