module.exports = {
	authenticateToken: (req, res, next)=>{
		var authHeader = req.headers['authorization'];
		var token = authHeader && authHeader.split(' ')[1]
		if(token == null) return res.sendStatus(401); // Dont have a Token

		// Verify the access token if valid
		jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
			if(err) return res.sendStatus(403) // Have Token but token no longer valid
			req.user = user;
			next();
		})
	}
}