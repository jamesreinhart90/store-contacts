var router = require('express').Router();
var queries = require('../queries/queries');

/* Find all Stores */
router.findAllStores = function (req, res) {
    queries.findAllStores()
        .then(stores => {
            res.send(stores); // return stores
        })
        .catch(err => {
            console.log(err);
        });    
};

/* Find store by storeNumber to display store info */
router.storeInfo = function (req, res) {
    // Run Query 
    queries.findStoreByStoreNumber(req.params.storeNumber)
        .then(stores => {
            // Return Store info
            res.render('storeInfo', {
                title: 'Store Contacts',
                stores: stores
            });
        }).catch(err => {
            console.log(err);
        });
};

/* Find store by storeNumber to display store info */
router.editStoreInfo = function (req, res) {
    // Run Query 
    queries.findStoreByStoreNumber(req.params.storeNumber)
        .then(stores => {
            // Return Store info
            res.render('editStoreInfo', {
                title: 'Store Contacts',
                stores: stores
            });
        }).catch(err => {
            console.log(err);
        });
};

/* Edit Store info */
router.editStoreInfoPost = function (req, res) {
    let storeInfo = {};
    let contactInfo = {};
    let districtInfo = {};
    let regionInfo = {};

    // Store Info
    storeInfo.storeNumber = req.params.storeNumber;
    req.body.nursery ? storeInfo.nursery = 1 : storeInfo.nursery = 0;
    req.body.petWashStation ? storeInfo.petWashStation = 1 : storeInfo.petWashStation = 0;
    req.body.smallEngine ? storeInfo.smallEngine = 1 : storeInfo.smallEngine = 0;
    req.body.books ? storeInfo.books = 1 : storeInfo.books = 0;
    req.body.fishing ? storeInfo.fishing = 1 : storeInfo.fishing = 0;
    req.body.fishingAndGuns ? storeInfo.fishingAndGuns = 1 : storeInfo.fishingAndGuns = 0;
    storeInfo.size = req.body.size;
    storeInfo.petSize = req.body.petSize;

    // Contact Info
    contactInfo.contactID = req.body.contactID;
    contactInfo.firstName = req.body.firstName;
    contactInfo.lastName = req.body.lastName;
    contactInfo.streetAddress = req.body.streetAddress;
    contactInfo.city = req.body.city;
    contactInfo.state = req.body.state;
    contactInfo.zip = req.body.zip;
    contactInfo.phoneNumber = req.body.phoneNumber;
    contactInfo.faxNumber = req.body.faxNumber;

    // District Info
    districtInfo.district = req.body.districtNumber;

    // Region Info
    regionInfo.region = req.body.regionNumber;

    // Update Queries
    queries.updateStoreInfo(storeInfo, contactInfo, districtInfo, regionInfo)
        .then(() => {
            res.redirect('/stores/' + req.params.storeNumber);
        })
        .catch(err => {
            console.log(err);
        });
};

/* Find store by store number */
router.findStoreByStoreNumber = function (req, res) {
    // Run Query 
    queries.findStoreByStoreNumber(req.params.storeNumber)
        .then((store) => {
            res.send(store); // Return Store
        }).catch(err => {
            console.log(err);
        });        
};

/* Find store by district number */
router.findStoreByDistrictID = function (req, res) {
    // Run Query 
    queries.findStoreByDistrictID(req.params.districtID)
        .then((store) => {
            res.send(store); // Return Store
        }).catch(err => {
            console.log(err);
        });
};

/* Find store by region number */
router.findStoreByRegionID = function (req, res) {
    // Run Query 
    queries.findStoreByRegionID(req.params.regionID)
        .then((store) => {
            res.send(store); // Return Store
        }).catch(err => {
            console.log(err);
        });
};

module.exports = router;