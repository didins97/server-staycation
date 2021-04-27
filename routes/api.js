const router = require('express').Router();
const apiController = require('../controllers/apiController.js');
// const { uploadSingle, uploadMultiple } = require('../middlewares/multer');

// router.get('/signin', adminController.viewSignin);
router.get('/landing-page', apiController.landingPage);

module.exports = router;