const router = require('express').Router();
const multer = require('../middleware/multer');
const {schoolSignup, confirmEmail, schoolLogin, schoolProfile} = require('../controllers/schoolController/schoolController');

// signup a new school account and confirm the email account
router.route('/signup').post(schoolSignup);
router.route('/confirmEmail/:id').post(confirmEmail);

// Login to account
// Add a cookie session to it.
router.route('/login').post(schoolLogin);


// Get Parent Details
router.route('/Profile/:id').get(schoolProfile);



module.exports = router;	