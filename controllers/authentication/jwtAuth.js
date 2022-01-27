const jwt = require('jsonwebtoken');

module.exports ={
  createJWTAuth: ({_id, firstName, lastName, email})=>{
        var newAuth = jwt.sign({ 
          useId: _id,
          firstName: firstName,
          lastName: lastName,
          email: email }, process.env.COOKIE_SECRET_KEY, {
        expiresIn: 86400, // 24 hours
      });
      return newAuth;
}, 
  authUserToken: () =>{

	// return
  }
}

