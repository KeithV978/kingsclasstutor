const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "You have to signin/signup to view this page" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
	verifyToken
   };
   module.exports = authJwt;