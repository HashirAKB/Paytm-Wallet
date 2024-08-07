const { response } = require("express");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({ message: 'Forbidden: Invalid or missing token' });
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userid = decoded.userId;
        next();
    }
    catch(err){
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

module.exports = {
    authMiddleware
}
