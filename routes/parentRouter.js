const router = require('express').Router();
const multer = require('../middleware/multer');
const parentController = require('../controllers/parentController/parentController');

	// CREATE CREATE CREATE CREATE

	// Signup a new parent
	router.route('/signup').post(parentController.parentSignup)

	// Confirm Email after signup
	router.route('/confirmEmail/:id').post(parentController.confirmEmail)

	// Upload Photo
	router.route('/uploadPhoto/:id').post(parentController.parentProfilePhotoUpload)

	// Edit Profile Data
	router.route('/editparentProfile/:id').post(parentController.editParentProfile)

	// Get Parent Details
	router.route('/parentProfile/:id').get(parentController.ParentProfile)

	
	// Update Password
	router.route('/resetPassword/:id').post(parentController.updatePassword)

module.exports = router;