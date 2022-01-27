const Tutor =  require('../../models/tutorModels/TutorModel');
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
				reject(new Error('Server Error'))
			}
			if(tutor){
				reject(new Error("A user with this email has already been registered. Please signup with a new email."))
			}else{
				// Create the new User Since it doesn't exist.
				let email = req.body.email;
				let password =  req.body.password;
				const newTutor = new Tutor({email, password});
  
				// Save the new User
				newTutor.save()
				.then( item =>{
					// send an mail to confirm email address.
					emailSender(item.email, emailMessages.tutorConfirmationMessage(item._id, "tutor"))
					return res.status(200)
				})
				.catch(err => res.send(err));
			}
		}); 
	},

	//Confriming new tutor emails
	confirmEmail: (req, res) =>{
		const {id} = req.params;
		
		Tutor.findByIdAndUpdate(id, {
			    confirmEmail: true
		},(err)=>{ 
			if(err) res.send(err);
			else res.redirect(`${CLIENT_ORIGIN}/profile/${id}`);
		})	
	},

	// Login a Tutor
	tutorLogin: (req, res) =>{
		let {email, password} = req.body;

		Tutor.findOne(email, (err, tutor)=>{
			if(err) res.send(err);
			if(tutor){
				new matchPassword(password, tutor.password, (unmatching, matching)=>{
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

	// Edit Mode of service
	tutorEditServices: (req, res) =>{
		Tutor.findByIdAndUpdate(req.params.id,{ 
			    department: req.body.department,
			    subjects: req.body.subjects,
			    classes: req.body.classes,
			    adults_classes: req.body.adults_classes,
			    hourly_rate: req.body.hourly_rate,
			    mode_of_service_delivery: req.body.mode_of_service_delivery
		    },
		    (err)=>{
			if(err) res.send(err);
			else res.status(200);
		    })		    
	},

	// Edit Bio data
	tutorEditBio: (req, res) =>{
		Tutor.findByIdAndUpdate(req.params.id,
			{
			    firstName: req.body.firstName,
			    lastName: req.body.lastName,
			    gender: req.body.gender,
			    date_of_birth: req.body.date_of_birth,
		    	},
		    	(err)=>{
			if(err) res.send(err);
			else res.status(200);
		})
	},

	// EDit Contact Info
	tutorEditContactInfo: (req, res) =>{
		Tutor.findByIdAndUpdate(req.params.id,{
			    phone: req.body.phone,
			    address: { street: req.body.street, city: req.body.city, state: req.body.state}
		    },
		    (err)=>{
			if(err) res.send(err);
			else res.status(200);
		    })
		    
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