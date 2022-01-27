
// Use a decrypter

module.exports ={
	 matchPassword: (submittedPassword, dbPassword, cb) =>{
	var success = failure = false;
	(submittedPassword === dbPassword) ? success = true : failure = true;
	return cb(failure, success)
	}
}