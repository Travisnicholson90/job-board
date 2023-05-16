const router = require('express').Router();
const loginRoutes = require('./login-routes.js');
const categoryRoutes = require('./job-category-routes.js');
const listingRoutes = require('./job-routes.js');
const signupRoutes = require('./signup-routes');

router.use('/login', loginRoutes);
router.use('./signup', signupRoutes);
router.use('/categories', categoryRoutes);
router.use('/listings', listingRoutes);


module.exports = router;
