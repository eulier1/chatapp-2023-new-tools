import jwt from "jsonwebtoken";

// Only for demo purpose, not for production
export const SECRET_KEY  = 'ABC123'

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('Authentication Middleware', req.headers.authorization)
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
  
      req.user = user;
      next();
    }); 
  };