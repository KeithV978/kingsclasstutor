const Tutor =  require('../../models/TutorModels/TutorModel');
const emailSender = require('../email/emailSender');
const emailMessages = require('../email/emailMessagesTepmlate');
const {CLIENT_ORIGIN} = require('../../config');
const matchPassword = require('../authentication/matchPassword');

module.exports = {
	// Sign New Tutor Up
	tutorSignup: (req, res) =>{
		// Fisrt Check if User already exists
		Tutor.findOne({email: req.body.email}, (err, tutor)=>{
			if(err){
				res.send({message :'Server Error: ' +err})
			}
			// If it exists, reject the registeration
			if(tutor){
				res.send({message: "A user with this email has already exists. Please signup with a different email."})
			}else{
				// Create the new User Since it doesn't exist.
				let email = req.body.email;
				let password =  req.body.password;
				const newTutor = new Tutor({email, password});
  
				// Save the new User
				newTutor.save()
				.then( savedTutor =>{
					// send an mail to confirm email address.
					emailSender(savedTutor.email, emailMessages.tutorConfirmationMessage(savedTutor._id, "tutor"))
					return res.send({message: "Your signup was successful. Please verify your email. A verification code has been sent to "+savedTutor.email})
				})
				.catch(err => res.send({message: err}));
			}
		}); 
	},

	//Confriming new tutor emails
	confirmEmail: (req, res) =>{
		const {id} = req.params;
		
		Tutor.findByIdAndUpdate(id, {
			    confirmEmail: true 
		},(err)=>{ 
			if(err) res.send({meaage: err});
		})	 
		return res.redirect(`${CLIENT_ORIGIN}/profile/${id}`);
	},

	// Login a Tutor
	tutorSignin: (req, res) =>{
		let {email, password} = req.body;

		Tutor.findOne(email, (err, tutor)=>{
			if(err) res.send({message: err});
			if(tutor){
				matchPassword(password, tutor.password, (unmatching) =>{
					if(unmatching) res.send({message: "Password is not correct"});
					// Create JWT here and send response
				})
			}
		})
	},

	// Send a particular tutor profile
	getTutorProfile: (req, res)=>{
		Tutor.findById(req.params.id)
		   .then(tutor => res.json(tutor))
		   .catch(err => res.status(400).json('Error: '+ err));
	},

	// EDit Contact Info
	updateTutorProfile: (req, res) =>{
		
		Tutor.findByIdAndUpdate(req.params.id,{
			    phone: req.body.phone,
			    address: { street: req.body.street, city: req.body.city, state: req.body.state}
		    },
		    (err)=>{
			if(err) res.send(err);
			
		    }) 
		    return res.status(200);
		    
	},

	// Update/Edit Password
	updatePassword: (req, res) =>{
		Tutor.findByIdAndUpdate(req.params.id,{
			password: req.body.password
			},
			(err)=>{
				if(err) res.send(err);
				else res.status(200);
			})
	},

	//Uplaod Resume
	tutorProfileUploadResume: (req, res) =>{

	},

	// Upload Profile Photo
	tutorProfileUploadPhoto: (req, res)=>{

	}
}