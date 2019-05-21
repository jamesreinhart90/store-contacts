var router = require('express').Router();
// Connect to the home controller
const homeController = require('../controllers/home_controller');
const storeController = require('../controllers/store_controller');

/* GET home page. */
router.get('/', homeController.home);

/* POST home page inputbox Search */
//router.post('/textbox_search/:storeNumber', homeController.txtboxSearch);

module.exports = router;