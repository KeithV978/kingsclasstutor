const router = require('express').Router();
const multer = require('../middleware/multer');
const tutorController = require('../controllers/tutorController/tutorController');
const {authenticateToken} = require('../middleware/authToken');
 
	// Signup a new tutor
	router.route('/signup').post(tutorController.tutorSignup);

	// Confirm Email after signup
	router.route('/confirmEmail/:id').post(tutorController.confirmEmail);

	// Load Edit Profile Page
	router.route('/profile/:id').get(authenticateToken, tutorController.getTutorProfile);

	// Edit Services
	router.route('/updateServices/:id').post(authenticateToken, tutorController.tutorEditServices);

	// Edit Bio
	router.route('/editBio/:id').post(authenticateToken, tutorController.tutorEditBio);

	//Edit Contact Info
	router.route('/contactInfo/:id').post(authenticateToken, tutorController.tutorEditContactInfo);

	// Update Password
	router.route('/resetPassword/:id').post(authenticateToken, tutorController.updatePassword);

	// Upload Resume
	router.route('/uploadResume/:id').post(authenticateToken, tutorController.tutorProfileUploadResume);

	// Upload Profile Photo
	router.route('/uploadPhoto/:id').post(authenticateToken, tutorController.tutorProfileUploadPhoto);


module.exports = router;