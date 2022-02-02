//Import Models
const Parent = require('../../models/ParentModel/parentModel');
const Tutor  = require('../../models/TutorModels/TutorModel');
const ServiceInProgress = require('../../models/ServiceModels/ParentService'); 
const emailSender = require('../email/emailSender');
const emailMessages = require('../email/emailMessagesTepmlate');
const ParentService = require('../../models/ServiceModels/ParentService');

module.exports = {
	// Sign new Parent Up
	parentSignup: (req, res) =>{
		//Fisrt Check if User already exists
		
		Parent.findOne({email: req.body.email}, (err, parent)=>{
			if(err){
				reject(new Error('Server Error'))
			}
			if(parent){
				reject(new Error("A user with this email has already been registered. Please signup with a new email."))
			}else{
				// Create the new User Since it doesn't exist.
				let email = req.body.email;
				let password =  req.body.password;
				const newParent = new Parent({email, password});

				
				// Save the new User
				newParent.save()
				.then( item =>{
					///send an mail to confirm email address.
					emailSender(item.id, emailMessages.confirmationMessage(item.id, "parent"))
					return res.status(200)
				})
				.catch(err => res.send(err));
			}
		});
	},

	// Confirm New Parent Email
	confirmEmail: (req, res) =>{
		const {id} = req.params;
		Parent.findById(id)
		    .then(parent =>{
			    parent.confirmEmail = true;
			    parent.save()
			    .then(parent =>{
					res.redirect(`/parent-profile/:${id}`);
			    })
			    .catch(err => res.status(400).json('Error: '+ err));
		    })
		    .catch(err => res.status(400).json('Error: '+err));
	}, 

	// Authenticate and login a Parent 
	parentLogin: async (req, res)=>{
		 
		
	},

	// Get A Prarent Profile based on ID
	parentProfile: (req, res)=>{
		Parent.findById(req.param.id,(err, parent)=>{
			if(err) res.send(err);
			res.json(parent);
		})
	},
 
	// Update Password
	updatePassword: (req, res)=>{
		Parent.findByIdAndUpdate(req.params.id, {
			password: req.body.password
		},(err)=>{
			if(err) res.send(err);
			else res.status(200);
		})
	},
	// Edit Parent Profile
	editParentProfile:(req, res)=>{
		Parent.findByIdAndUpdate(req.params.id,{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			street: req.body.street,
			city: req.body.city,
			_state: req.body._state,
			phone: req.body.phone
		},
		(err)=>{
			if(err) res.send(err);
			else res.status(200);
		})
	},
	// Upload Profile Photo
	parentProfilePhotoUpload: (req, res)=>{

	}, 
	parentDashboard: (req, res) =>{

	},

	//First Stage in Hiring Process
	stageOne: (req, res)=>{
		let {_class, subject, gender} = req.body;
		Tutor.find({_class, subject, gender}, (err, tutors)=>{
			if(err) res.send({message: err});
			res.send(tutors);
		})		
	},
	stageTwo: (req, res)=>{
		let {parent_Id, parent_Name, tutor_Id, tutor_Name, duration, hours, days, start_date, end_date, first_payment_receipt_no, first_payment} = req.body;
		const newService = new ParentService({parent_Id, parent_Name, tutor_Id, tutor_Name, duration, hours, days, start_date, end_date, first_payment_receipt_no, first_payment});

		newService.save()
		.then(service =>{
			Parent.findByIdAndUpdate(parent_Id, {
				services: [...services, service._id]
			}, (err)=>{
				res.send({message: err});
			})
			res.send({message: service})
		})
		.catch(err=>{
			res.send({message: err})
		})
	}
}