const router = require('express').Router();
const multer = require('../middleware/multer');
const {tutorSignup, confirmEmail, getTutorProfile,tutorSignin, updateTutorProfile,
	updatePassword,tutorProfileUploadResume, tutorProfileUploadPhoto, refreshToken} = require('../controllers/tutorController/tutorController');
const verifyToken = require('../middleware/authToken');
 
	// Signup a new tutor
	router.route('/signup').post(tutorSignup);

	// Signin
	router.route('/signin').post(tutorSignin);

	// Refresh JWT Token
	router.route('/refresh-token').post(refreshToken);

	// Confirm Email after signup
	router.route('/confirmEmail/:id').post(confirmEmail);

	// Load Edit Profile Page
	router.route('/profile/:id').get(verifyToken, getTutorProfile);

	//Edit Profile
	router.route('/profile/:id').put(verifyToken, updateTutorProfile);

	// Update Password
	router.route('/updatePassword/:id').post(verifyToken, updatePassword);

	// Upload Resume
	router.route('/uploadResume/:id').post(verifyToken, tutorProfileUploadResume);

	// Upload Profile Photo
	router.route('/uploadPhoto/:id').post(verifyToken, tutorProfileUploadPhoto);


module.exports = router;