const router = require('express').Router();
const multer = require('../middleware/multer');
const {parentSignup, parentLogin, confirmEmail, editParentProfile, parentProfile, updatePassword, parentProfilePhotoUpload} = require('../controllers/parentController/parentController');

	// CREATE CREATE CREATE CREATE

	// Signup a new parent
	router.route('/signup').post(parentSignup)

	// Login to Parent account
	router.route('/login').post(parentLogin)

	// Confirm Email after signup
	router.route('/confirmEmail/:id').post(confirmEmail)

	// Edit Profile Data
	router.route('/editProfile/:id').post(editParentProfile)

	// Get Parent Details
	router.route('/Profile/:id').get(parentProfile)
	
	// Update Password
	router.route('/resetPassword/:id').post(updatePassword)

	// Upload Photo
	router.route('/uploadPhoto/:id').post(parentProfilePhotoUpload)

module.exports = router;