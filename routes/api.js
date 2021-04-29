const router = require('express').Router();
const apiController = require('../controllers/apiController.js');
const { uploadSingle } = require('../middlewares/multer');

// router.get('/signin', adminController.viewSignin);
router.get('/landing-page', apiController.landingPage);
router.get('/detail-page/:id', apiController.detailPage);
router.post('/booking-page', uploadSingle, apiController.bookingPage);

module.exports = router;