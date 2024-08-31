// types/express.d.ts
import { Request } from 'express';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    locals?: any; // Define the type of user if known (e.g., { userId: string })
  }
}
 