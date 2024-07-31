import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_KEY;
if (!secretKey) {
  throw new Error("JWT_KEY is not defined in the environment variables");
}

class TokenExpiredError extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenExpiredError";
    this.status = 401;
    this.error = message;
  }
}

class JsonWebTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = "JsonWebTokenError";
    this.status = 400;
    this.error = message;
  }
}

class NotBeforeError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotBeforeError";
    this.status = 400;
    this.error = message;
  }
}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error('Error Verifying Token:', error);
    if (error.name === 'TokenExpiredError') {
      throw new TokenExpiredError("JWT expired");
    } else if (error.name === 'JsonWebTokenError') {
      throw new JsonWebTokenError("Invalid signature");
    } else if (error.name === 'NotBeforeError') {
      throw new NotBeforeError("Token not active");
    }
    throw new Error("Invalid token");
  }
};

const authMiddleware = async (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: false,
        message: "No token provided",
        error: "Authorization header must be in Bearer format"
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = verifyToken(token);
    if (decodedToken && decodedToken.payload.userId) {
      req.user = decodedToken;
      next();
    } else {
      throw new Error("Invalid User ID");
    }
  } catch (error) {
    res.status(error.status || 400).json({
      status: false,
      message: error.message,
      error: "Authentication failed"
    });
  }
};

export default authMiddleware;
