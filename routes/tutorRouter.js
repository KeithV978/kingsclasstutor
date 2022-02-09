const router = require('express').Router();
const {photoUploader, resumeUploader} = require('../middleware');
const {tutorSignup, confirmEmail, getTutorProfile,tutorSignin, updateTutorProfile,
	updatePassword,tutorProfileUploadResume, tutorProfileUploadPhoto,
	getTutorProfileUploadResume, getTutorProfileUploadPhoto, refreshToken} = require('../controllers/tutorController/tutorController');
const {verifyToken} = require('../middleware/authToken');

	// Signup a new tutor
	router.route('/signup').post(tutorSignup);

	// Signin
	router.route('/signin').post(tutorSignin);

	// Refresh JWT Token
	router.route('/refresh-token').post(refreshToken);

	// Confirm Email after signup
	router.route('/confirmEmail/:id').post(confirmEmail);

	// Get Tutor Profile Page
	// POST
	router.route('/profile/:id').post(verifyToken, updateTutorProfile);
	// GET
	router.route('/profile/:id').get(verifyToken, getTutorProfile);
	
	// Update Password
	router.route('/updatePassword/:id').post(verifyToken, updatePassword);

	// Upload Resume
	//POST
	router.route('/uploadResume/:id').post([verifyToken,resumeUploader], tutorProfileUploadResume);
	//GET
	router.route('/uploadResume/:id').get(verifyToken, getTutorProfileUploadResume);

	// Upload Profile Photo
	// POST
	router.route('/uploadPhoto/:id').post([verifyToken, photoUploader], tutorProfileUploadPhoto);
	// GET
	router.route('/uploadPhoto/:id').get(verifyToken, getTutorProfileUploadPhoto);

module.exports = router;