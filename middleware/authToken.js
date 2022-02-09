const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token is expired!" });
  }
}

  const verifyToken = (req, res, next) => {
    
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided. Please signin to continue." });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }
      req.Id = decoded.userID;
      next();
    });
    
  }

  module.exports = {verifyToken}