const jwt = require('jsonwebtoken');

exports.signAccessToken = (res, payload) => {
	try {
	  if (payload) {
	    const accessToken = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
	    const refreshToken = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '90d' })
	//     res.cookie('refreshToken', `${refreshToken}`, { maxAge: 86400 * 90, httpOnly: true })
	    return { accessToken, refreshToken }
	  }
	} catch (err) {
		res.status(401).send({message: err});
	}
   }
    
   exports.signRefreshToken = (req) => {
	try {
	  const getToken = req.headers.refreshToken
	  if (getToken) {
	    const { id, email, lastName, firstName } = jwt.verify(getToken, process.env.REFRESH_TOKEN_SECRET)
	    const accesssToken = jwt.sign({ id, email, lastName, firstName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '90d' })
	    return { accesssToken }
	  }
	} catch (err) {
		res.status(401).send({message: err});
	}
   }