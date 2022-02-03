const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization.split('Bearer ')[1]
    const decoded = jwt.verify(tokenHeader, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    next(httpError(401))
  }
}