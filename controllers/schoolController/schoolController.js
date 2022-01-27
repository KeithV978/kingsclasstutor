const School = require('../../models/SchoolModel/schoolModel');
const emailSender = require('../email/emailSender');
const emailMessages = require('../email/emailMessagesTepmlate');
const {createJWTAuth} = require('../authentication/jwtAuth');


module.exports = {
	schoolSignup: (req, res) =>{
		// Fisrt Check if User already exists
		School.findOne({email: req.body.email}, (err, school)=>{
			if(err){
				reject(new Error('Server Error'))
			}
			if(school){
				reject(new Error("A user with this email has already been registered. Please signup with a new email."))
			}else{
				// Create the new User Since it doesn't exist.
				let email = req.body.email;
				let password =  bcrypt.hashSync(req.body.password, 8);
				const newSchool = new School({email, password});
  
				// Save the new User
				newSchool.save()
				.then( item =>{
					// send an mail to confirm email address.
					emailSender(item.email, emailMessages.SchoolConfirmationMessage(item._id, "school"));
					req.session.token = createJWTAuth(school);					
					res.status(200).send({
						//send back the Token
						id: school._id,
						username: school.username,
						email: school.email,
						isAdmin: school.isAdmin,
						userType: school.userType
					   });
				})
				.catch(err => res.send(err));
			}
		}); 
	},

	confirmEmail: (req, res) =>{
		const {id} = req.params;
		
		School.findByIdAndUpdate(id, {
			    confirmEmail: true
		},(err)=>{
			if(err) res.send(err);
			else res.redirect(`${CLIENT_ORIGIN}/profile/${id}`);
		})	
	},

	schoolLogin:(req, res)=>{
		School.findOne({email: req.body.email}, (err, school)=>{
			if(err){
				reject(new Error('Server Error'))
			}
			if(school){ 
				// Create Auth using JWT here...
				// const authedUser = createJWTAuth(school, secret_key)
				var passwordIsValid = bcrypt.compareSync(
					req.body.password,
					school.password
					);
				
					if (!passwordIsValid) {
					return res.status(401).send({ message: "Invalid Password!" });
					}
				
					req.session.token = createJWTAuth(school);
					
					res.status(200).send({
						id: school._id,
						username: school.username,
						email: school.email,
						isAdmin: school.isAdmin,
						userType: school.userType
					   });
			}
		})
		
	},
	signout: async (req, res) => {
		try {
		  req.session = null;
		  return res.status(200).send({ message: "You've been signed out!" });
		} catch (err) {
		  this.next(err);
		}
	   },

	schoolProfile: (req, res) =>{

	}
}