const router = require('express').Router();
const {fetchTutors, trackReference} = require('../controllers/hireController/');


// Fetch Tutors with macthing criteria.
router.route('/hire-new').get(fetchTutors);

router.route('/track').get(trackReference);


module.exports = router;	