import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) => {
    const { token } = req.headers;
    if(!token) {
        return res.json({success:false, message:"Not Authorized, Login Again."})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id; //The 'req.body' like a bag that carries information from the client to the server. In this case, we want to put the 'userId' into that bag so that it can be used later in the application.
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

export default authMiddleware;