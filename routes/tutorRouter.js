const router = require('express').Router();
const multer = require('../middleware/multer');
const {tutorSignup, confirmEmail, getTutorProfile,tutorSignin, updateTutorProfile,
	updatePassword,tutorProfileUploadResume, tutorProfileUploadPhoto} = require('../controllers/tutorController/tutorController');
const {authenticateToken} = require('../middleware/authToken');
 
	// Signup a new tutor
	router.route('/signup').post(tutorSignup);

	// Signin
	router.route('/signin').post(tutorSignin)

	// Confirm Email after signup
	router.route('/confirmEmail/:id').post(confirmEmail);

	// Load Edit Profile Page
	router.route('/profile/:id').get(authenticateToken, getTutorProfile);

	//Edit Profile
	router.route('/profile/:id').put(authenticateToken, updateTutorProfile);

	// Update Password
	router.route('/updatePassword/:id').post(authenticateToken, updatePassword);

	// Upload Resume
	router.route('/uploadResume/:id').post(authenticateToken, tutorProfileUploadResume);

	// Upload Profile Photo
	router.route('/uploadPhoto/:id').post(authenticateToken, tutorProfileUploadPhoto);


module.exports = router;