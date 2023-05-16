const router = require('express').Router();
const loginRoutes = require('./login-routes.js');
const categoryRoutes = require('./job-category-routes.js');
const listingRoutes = require('./job-routes.js');
const signupRoutes = require('./signup-routes');
const jobPostRoutes = require('./job-post-routes');

router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/categories', categoryRoutes);
router.use('/jobs', listingRoutes);
router.use('/job-post', jobPostRoutes);


module.exports = router;
