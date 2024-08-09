
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
