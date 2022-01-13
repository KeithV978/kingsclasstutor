const router = require('express').Router();
const multer = require('../middleware/multer');
const tutorController = require('../controllers/tutorController/tutorController');
 
	// Signup a new tutor
	router.route('/signup').post(tutorController.tutorSignup);

	// Confirm Email after signup
	router.route('/confirmEmail/:id').post(tutorController.confirmEmail);

	// Load Edit Profile Page
	router.route('/tutor-profile/:id').get(tutorController.getTutorProfile);

	// Edit Services
	router.route('/updateServices/:id').post(tutorController.tutorEditServices);

	// Edit Bio
	router.route('/tutorEditBio/:id').post(tutorController.tutorEditBio);

	//Edit Contact Info
	router.route('/contactInfo/:id').post(tutorController.tutorEditContactInfo);

	// Update Password
	router.route('/resetPassword/:id').post(tutorController.updatePassword);

	// Upload Resume
	router.route('/uploadResume/:id').post(tutorController.tutorProfileUploadResume);

	// Upload Profile Photo
	router.route('/uploadPhoto/:id').post(tutorController.tutorProfileUploadPhoto);


module.exports = router;