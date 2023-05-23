const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

// If the url is wrong send 404 status request.
router.get("*", (req, res) => res.status(404).send("<h1> 404 Not Found </h1>"));

module.exports = router;
