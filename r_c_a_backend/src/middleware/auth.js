import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(500).json({ error: `Server Error: ${error.message}` });
        }
        if (!token) {
            res.status(401).json({ error: `Not Authorized, No token` });
        }
    }
}
export default auth;    