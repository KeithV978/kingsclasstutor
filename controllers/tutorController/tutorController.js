const Tutor =  require('../../models/TutorModels/TutorModel');
const emailSender = require('../email/emailSender');
const emailMessages = require('../email/emailMessagesTepmlate');
const {CLIENT_ORIGIN} = require('../../config');
const ProfilePhoto = require('../../models/UploadsModel/photoModel');
const ResumeUpload = require('../../models/UploadsModel/resumeModel');
const RefreshToken = require('../../models/JwtModels')
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const { v4: uuidv4 } = require('uuid');
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
				let password =  bcrypt.hashSync(req.body.password, 8);
				const newTutor = new Tutor({email, password});
  
				// Save the new User
				newTutor.save()
				.then( savedTutor =>{
					// send an mail to confirm email address.
					// emailSender(savedTutor.email, emailMessages.tutorConfirmationMessage(savedTutor._id, "tutor"))
					
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
			if(err)  res.send({meaage: err});
			return;
		})	 
		res.redirect(`${CLIENT_ORIGIN}/profile/${id}`);
		return;
	},

	// Login a Tutor
	tutorSignin: (req, res) =>{
		let {email, password} = req.body;
		Tutor.findOne({email: email}, (err, tutor) => {
			if (err) {
				console.log(err);
				res.status(500).send({ message: err });
				return;
			}
			if (!tutor) {
				return res.status(404).send({ message: "This email address is unregistered. Please signup to continue." });
			   } 
			   var passwordIsValid = bcrypt.compareSync(password, tutor.password);
			 
			   if (!passwordIsValid) {	
				  return res.status(401).send({message: "Incorrect Password."});
			   }
			   let token = jwt.sign({ userId: tutor._id }, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: 3600,
			   });

			   let expiredAt = new Date();
   
				expiredAt.setSeconds(
				expiredAt.getSeconds() + 86400
				);
			
				let _token = uuidv4();
			
				let newRefreshToken = new RefreshToken({
				token: _token,
				user: tutor._id,
				expiryDate: expiredAt.getTime(),
				});
			
				newRefreshToken.save()
				.then((_object)=>{				 
				 res.status(200).send({
					tutor,
					accessToken: token,
					refreshToken: _object.token
					});
				})
				.catch(err =>{ 
					res.status(400).send({message: err})
				}) 
		});

	},

	// Send a particular tutor profile
	getTutorProfile: (req, res)=>{
		Tutor.findById(req.params.id)
		   .then(tutor => res.send(tutor))
		   .catch(err => res.status(400).send('Error: '+ err));
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
		    return res.status(200).send({message: "Update Successful!"});
		    
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
	getTutorProfileUploadResume: (req, res) =>{

	},

	getTutorProfileUploadPhoto: (req, res) =>{

	},
	// Upload Profile Photo
	tutorProfileUploadPhoto: (req, res)=>{

	},
	refreshToken: (req, res) => {
		const { refreshToken: requestToken } = req.body;
	   
		if (requestToken == null) {
		  return res.status(403).json({ message: "Refresh Token was not provided" });
		}
	   
		try {
		  let refreshToken = RefreshToken.findOne({ token: requestToken });
	   
		  if (!refreshToken) {
		    res.status(403).json({ message: "Refresh token is not on the database!" });
		    return;
		  }
	   
		  if (refreshToken.expiryDate.getTime() < new Date().getTime()) {
		    	RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
		    
		    res.status(403).send({
			 message: "Refresh token is expired. Please signin to continue",
		    });
		    return;
		  }
	   
		  let newAccessToken = jwt.sign({ id: refreshToken.userID }, process.env.ACCESS_TOKEN_SECRET, {
		    expiresIn: 3600,
		  });
	   
		  return res.status(200).send({
		    accessToken: newAccessToken,
		    refreshToken: refreshToken.token,
		  });
		} catch (err) {
		  return res.status(500).send({ message: err });
		}
	   }
}