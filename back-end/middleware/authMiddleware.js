import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) =>{
    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json('not authorized, token failed');
        }
    } else{
        res.status(401).json('not authorized, no token');
    }
};

// admin milware 

const admin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){ 
            next();
    } 
    else{
        res.status(401).json('not authorized, as Admin'); 
    }

};

export {protect, admin}