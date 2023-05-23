const router = require('express').Router();
const loginRoutes = require('./login-routes.js');
const categoryRoutes = require('./job-category-routes.js');
const listingRoutes = require('./job-routes.js');
const signupRoutes = require('./signup-routes');
const jobPostRoutes = require('./job-post-routes');
const myJobRoutes = require('./myjobs-routes.js')

router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/categories', categoryRoutes);
router.use('/jobs', listingRoutes);
router.use('/job-post', jobPostRoutes);
router.use('/myjobs', myJobRoutes);


module.exports = router;
