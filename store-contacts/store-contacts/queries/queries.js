var router = require('express').Router();
var models = require('../models');

// Find All Stores
router.findAllStores = async function () {
    console.log('made it here!');
    try {
        let stores = await models.Store.findAll({
            include: [
                {
                    model: models.Contact,
                    as: 'storeContact'
                },
                {
                    model: models.RegionManager,
                    as: 'storeRM',
                    include: [
                        {
                            model: models.Contact
                        }
                    ]
                },
                {
                    model: models.DistrictManager,
                    as: 'storeDM',
                    include: [
                        {
                            model: models.Contact
                        }
                    ]
                }
            ],
            order: [
                'storeNumber'
            ]
        });

        return stores;
    }
    catch (e) {
        console.log(e);
    }   
};

// Find all Districts
router.findAllDistricts = new Promise ((resolve, reject) => {
    models.DistrictManager.findAll({
        include: [{ model: models.Contact }]
    })
        .then(districts => {
            resolve(districts);
        })
        .catch(err => {
            reject(err);
        });
});

// Find all Regions
router.findAllRegions = new Promise ((resolve, reject) => {
    models.RegionManager.findAll({
        include: [{ model: models.Contact }]
    })
        .then(regions => {
            resolve(regions);
        })
        .catch(err => {
            reject(err);
        });
});    

// Find Store by Store Number
router.findStoreByStoreNumber = function (storeNumber) {
    return new Promise((resolve, reject) => {
        models.Store.findAll({
            where: {
                storeNumber: storeNumber
            },
            include: [
                {
                    model: models.Contact,
                    as: 'storeContact'
                },
                {
                    model: models.RegionManager,
                    as: 'storeRM',
                    include: [
                        {
                            model: models.Contact
                        }
                    ]
                },
                {
                    model: models.DistrictManager,
                    as: 'storeDM',
                    include: [
                        {
                            model: models.Contact
                        }
                    ]
                }
            ],
            order: [
                'storeNumber'
            ]
        })
            .then((store) => {
                resolve(store);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// Find Stores by District Manager ID
router.findStoreByDistrictID = function (districtID) {
    return new Promise((resolve, reject) => {
        models.Store.findAll({
            where: {
                districtManagerID: districtID
            },
            include: [
                {
                    model: models.Contact,
                    as: 'storeContact'
                },
                {
                    model: models.RegionManager,
                    as: 'storeRM',
                    include: [
                        {
                            model: models.Contact
                        }
                    ]
                },
                {
                    model: models.DistrictManager,
                    as: 'storeDM',
                    include: [
                        {
                            model: models.Contact
                        }
                    ]
                }
            ],
            order: [
                'storeNumber'
            ]
        })
            .then((store) => {
                resolve(store);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// Find Stores by Region Manager ID
router.findStoreByRegionID = function (regionID) {
    return new Promise((resolve, reject) => {
        models.Store.findAll({
            where: {
                regionManagerID: regionID
            },
            include: [
                {
                    model: models.Contact,
                    as: 'storeContact'
                },
                {
                    model: models.RegionManager,
                    as: 'storeRM',
                    include: [
                        {
                            model: models.Contact
                        }
                    ]
                },
                {
                    model: models.DistrictManager,
                    as: 'storeDM',
                    include: [
                        {
                            model: models.Contact
                        }
                    ]
                }
            ],
            order: [
                'storeNumber'
            ]
        })
            .then((store) => {
                resolve(store);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// Update Store Info
router.updateStoreInfo = async function (storeInfo, contactInfo, districtInfo, regionInfo) {
    try {
        // Update Store
        await models.Store.update(
            {
                nursery: storeInfo.nursery,
                petWashStation: storeInfo.petWashStation,
                smallEngine: storeInfo.smallEngine,
                books: storeInfo.books,
                fishing: storeInfo.fishing,
                fishingAndGuns: storeInfo.fishingAndGuns,
                size: storeInfo.size,
                petSize: storeInfo.petSize
            },
            {
                where: {
                    storeNumber: storeInfo.storeNumber
                }
            }
        );

        // Update Contact Info
        await models.Contact.update(
            {
                firstName: contactInfo.firstName,
                lastName: contactInfo.lastName,
                phoneNumber: contactInfo.phoneNumber,
                faxNumber: contactInfo.faxNumber,
                streetAddress: contactInfo.streetAddress,
                city: contactInfo.city,
                state: contactInfo.state,
                zip: contactInfo.zip
            },
            {
                where: {
                    contactID: contactInfo.contactID
                }
            }
        );

        // Find district
        let districts = await models.DistrictManager.findAll(
            {
                where: {
                    districtNumber: districtInfo.district
                }
            }
        );

        // Find region
        let regions = await models.RegionManager.findAll(
            {
                where: {
                    regionNumber: regionInfo.region
                }
            }
        );

        // Update Store with new district ID
        await models.Store.update(
            {
                districtManagerID: districts[0].districtManagerID
            },
            {
                where: {
                    storeNumber: storeInfo.storeNumber
                }
            }
        );

        // Update Store with new region ID
        await models.Store.update(
            {
                regionManagerID: regions[0].regionManagerID
            },
            {
                where: {
                    storeNumber: storeInfo.storeNumber
                }
            }
        );
    }
    catch (e) {
        console.log(e);
    }

    return;
};


module.exports = router;