var router = require('express').Router();
var models = require('../models');

// Find All Stores
router.findAllStores = new Promise ((resolve, reject) => {
    models.Store.findAll({
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
        .then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
});

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


module.exports = router;