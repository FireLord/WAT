
import jwt from 'jsonwebtoken';

export const authenticateJWT = (token:string) => {
    if (!token) {
        return 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded
    } catch (err) {
        console.log(err.message);

        return err.message
    }
};



// Middleware to authenticate and check if the access token is expired
export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader, !token)
  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Access token expired' });
      }
      return res.status(403).json({ message: 'Invalid access token' });
    }

    req.locals.user = decoded; // Add decoded information (like userId) to the request
    next();
  });
};
