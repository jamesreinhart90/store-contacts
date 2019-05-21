var router = require('express').Router();
var queries = require('../queries/queries');

/* Find all Stores */
router.findAllStores = function (req, res) {
    // Run query
    queries.findAllStores
        .then(stores => {
            res.send(stores); // return stores
        }).catch(err => {
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

router.editStoreInfoPost = function (req, res) {
    let storeInfo = {};
    let contactInfo = {};
    let districtInfo = {};
    let regionInfo = {};


    contactInfo.firstName = req.body.firstName;
    contactInfo.lastName = req.body.lastName;
    contactInfo.streetAddress = req.body.streetAddress;
    contactInfo.city = req.body.city;
    contactInfo.state = req.body.state;
    contactInfo.zip = req.body.zip;


    console.log(req);
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