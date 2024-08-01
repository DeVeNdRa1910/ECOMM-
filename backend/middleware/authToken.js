import jwt from 'jsonwebtoken';

export default function authToken(req, res, next) {
  try {
    const token = req.headers?.authorization?.split(' ')[1] || req.cookies?.token;

    console.log(token);

    if (!token) {
      return res.status(401).json({
        message: "Please login...",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.JWTOKEN_SECRET_KEY, (error, decodedToken) => {
      if (error) {
        console.log("Error auth", error);
        return res.status(401).json({
          message: "Invalid token",
          error: true,
          success: false,
        });
      }

      if (decodedToken) {
        console.log("Decoded Token is ", decodedToken);
        req.userId = decodedToken._id;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
