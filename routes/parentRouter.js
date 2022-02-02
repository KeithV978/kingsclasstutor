const router = require('express').Router();
const multer = require('../middleware/multer');
const {parentDashboard, parentSignup, parentLogin, 
	confirmEmail, editParentProfile, parentProfile, 
	updatePassword, parentProfilePhotoUpload, stageOne, stageTwo} = require('../controllers/parentController/parentController');

	// CREATE CREATE CREATE CREATE

	// Signup a new parent
	router.route('/signup').post(parentSignup)

	// Login to Parent account
	router.route('/login').post(parentLogin)

	// Confirm Email after signup
	router.route('/confirmEmail/:id').post(confirmEmail)

	// Edit Profile Data
	router.route('/editProfile/:id').put(editParentProfile)

	// Get Parent Details
	router.route('/Profile/:id').get(parentProfile)

	router.route('/parent/dashboard').get(parentDashboard)
	
	// Update Password
	router.route('/updatePassword/:id').post(updatePassword)

	// Upload Photo
	router.route('/uploadPhoto/:id').post(parentProfilePhotoUpload)

	router.route('/hire-stage-one').get(stageOne)

	router.route('/hire-stage-two').get(stageTwo)

module.exports = router;