var router = require('express').Router();

// Connect to the the controllers
const homeController = require('../controllers/home_controller');
const storeController = require('../controllers/store_controller');

/* GET Find All Stores */
router.get('/findAllStores', storeController.findAllStores);

/* GET Store Info */
router.get('/:storeNumber', storeController.storeInfo);

/* GET Edit Store Info */
router.get('/:storeNumber/edit', storeController.editStoreInfo);

/* POST Edit Store Info */
router.post('/:storeNumber/edit', storeController.editStoreInfoPost);

/* GET Search by Store Number */
router.get('/findStoreByStoreNumber/:storeNumber', storeController.findStoreByStoreNumber);

/* GET Search by District Number */
router.get('/findStoreByDistrictManagerID/:districtID', storeController.findStoreByDistrictID);

/* GET Search by District Number */
router.get('/findStoreByRegionManagerID/:regionID', storeController.findStoreByRegionID);

module.exports = router;