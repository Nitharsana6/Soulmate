import jwt from 'jsonwebtoken';


export default function verifyAdmin(req, res, next) {
    console.log('req.user:', req.user); // Debugging line
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
}
