var models = require('../models');
const fs = require('fs');

/* Test create contact and store controller */
exports.create = function (req, res) {
    res.render('districtForm');
};

exports.createPost = function (req, res) {
    models.Contact.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        faxNumber: req.body.faxNumber,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }).then(contact => {
        models.RegionManager.create({
            regionNumber: req.body.districtNumber,
            contactID: contact.contactID
        });
    }).then(complete => {
        res.send('complete');
    });
};

/* Test retriving data from database */
exports.retrieve = function (req, res) {
    // Find Store
    models.Store.findOne({
        where: {
            storeNumber: 3
        },
        //Include contacts
        include: [
            {
                model: models.Contact
            }
        ]
    }).then(result => {
        // display results
        res.send(result);
    });
};

exports.add = function (req, res) {

    var readXMLData = function (file) {
        return new Promise(function (resolve, reject) {
            fs.readFile(file, 'utf-8', function (err, data) {
                if (err) {
                    reject('There was an issue reading that file, Please make sure the file exists.');
                } else {
                    resolve(data);
                }
            });
        });
    };

    async function addSegments2Array(data, listArray) {
        return new Promise(function (resolve, reject) {
            var segment;
            if (data.search('<m:properties>') !== -1) {
                segment = data.slice(data.search('<m:properties>') + 14, data.search('</m:properties>'));
                data = data.slice(data.search('</m:properties>') + '</m:properties>'.length, data.length);
                listArray.push(segment);
                resolve(addSegments2Array(data, listArray));
            } else {
                if (listArray.length > 0) {
                    resolve(listArray);
                } else {
                    reject('Could not find any properties');
                }
            }
        });
    }

    async function createObjectFromSegment(arrayList) {
        return new Promise(async function (resolve, reject) {
            var property;
            var value;
            var segment;
            var obj = {};
            var newArray = [];
            arrayList.forEach(function (part, index) {
                obj = {};
                segment = part;

                function findPropertiesAndValues(segment, callback) {
                    if (segment.search('<d:') !== -1) {
                        // Parse segment to remove properties and values
                        property = segment.slice(segment.search('<d:') + 3, segment.search('>'));
                        segment = segment.slice(segment.search('>') + 1, segment.length);
                        value = segment.slice(0, segment.search('<'));
                        segment = segment.slice(segment.search(/\n/) + 1, segment.length);
                        property = property.split(' ')[0];
                        if (property.toUpperCase() === 'ZIP') {
                            property = 'zip';
                        }
                        // If value is equal to new line, change value to null
                        if (value.search(/\n/) !== -1) {
                            value = null;
                        }
                        if (value === undefined) {
                            value = '';
                        }
                        property = property.replace(/_x0020_/g, ' ');
                        property = property.charAt(0).toLowerCase() + property.slice(1);
                        property = property.replace(/\W+(.)/g, function (match, chr) {
                            return chr.toUpperCase();
                        });
                        if (value !== '' && value !== null) {
                            if (value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
                                value = value.replace(/\D/g, "");
                            }
                            if (value.match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
                                value = value.replace(/\D/g, "");
                            }
                            value = value.replace(/&amp;/, '&');
                        }
                        // Modify date to show time in my time zone.
                        if (property === 'modified') {
                            var dateArray = [];
                            var offset = new Date();
                            offset = offset.getTimezoneOffset() / 60;
                            dateArray[0] = value.slice(0, value.search('-'));
                            value = value.slice(value.search('-') + 1, value.length);
                            dateArray[1] = value.slice(0, value.search('-')) - 1;
                            value = value.slice(value.search('-') + 1, value.length);
                            dateArray[2] = value.slice(0, value.search('T'));
                            value = value.slice(value.search('T') + 1, value.length);
                            dateArray[3] = value.slice(0, value.search(':'));
                            value = value.slice(value.search(':') + 1, value.length);
                            dateArray[4] = value.slice(0, value.search(':'));
                            value = value.slice(value.search(':') + 1, value.length);
                            dateArray[5] = value.slice(0, value.search('Z'));
                            value = new Date(dateArray[0], dateArray[1], dateArray[2], dateArray[3] - offset, dateArray[4], dateArray[5]);
                        }
                        obj[property] = value;
                        findPropertiesAndValues(segment, callback);
                    } else {
                        if (obj === {}) {
                            callback('Could not find any properties in xml file', null);
                        } else {
                            // Delete non needed properties and values.
                            delete obj.fileSystemObjectType;
                            delete obj.serverRedirectedEmbedUri;
                            delete obj.serverRedirectedEmbedUrl;
                            delete obj.contentTypeId;
                            delete obj.complianceAssetId;
                            delete obj.oData__UIVersionString;
                            delete obj.gUID;
                            delete obj.iD;
                            delete obj.id;
                            delete obj.modified;
                            delete obj.created;
                            delete obj.authorId;
                            delete obj.editorId;
                            delete obj.attachments;
                            obj.store = obj.title;
                            delete obj.title;
                            callback(null, obj);
                        }
                    }
                }
                findPropertiesAndValues(segment, function (err, object) {
                    if (err) {
                        reject(err);
                    } else {
                        newArray.push(object);
                    }
                });

            });
            resolve(newArray);
        });
    }

    async function createNewStoreQuery(contactArrayListObjects, storeListObjects) {
        return new Promise(function (resolve, reject) {
            var queryArray = [];
            var object;
            contactArrayListObjects.forEach(async function (contact) {
                let stores = storeListObjects.filter(value => value.store === contact.store);
                // Stores has value
                if (stores.length) {
                    object = {
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        phoneNumber: contact.phoneNumber,
                        faxNumber: contact.faxNumber,
                        streetAddress: contact.streetAddress,
                        state: contact.state,
                        zip: contact.zip,
                        city: contact.city,
                        storeNumber: stores[0].store,
                        nursery: stores[0].nursery,
                        petWashStation: stores[0].petWashStation,
                        smallEngine: stores[0].smallEngine,
                        books: stores[0].books,
                        fishing: stores[0].fishing,
                        fishingAndGuns: stores[0].fishingAndGuns,
                        size: stores[0].size,
                        petSize: stores[0].petSize,
                        regionManagerID: stores[0].rEGION,
                        districtManagerID: stores[0].dISTRICT
                    };
                    queryArray.push(object);
                }
            });
            resolve(queryArray);
        });
    }           

    async function getDistrictManagerID(districtNumber) {
        return new Promise(function (resolve, reject) {
            if (districtNumber !== null) {
                models.DistrictManager.findOne({
                    where: {
                        districtNumber: districtNumber
                    }
                }).then(function (result) {
                    resolve(result.districtManagerID);
                }).catch(function (error) {
                    console.log(error);
                    reject(error);
                });
            } else {
                resolve(districtNumber);
            }            
        });
    }

    async function getRegionManagerID(regionNumber) {
        return new Promise(function (resolve, reject) {
            if (regionNumber !== null) {
                models.RegionManager.findOne({
                    where: {
                        regionNumber: regionNumber
                    }
                }).then(function (result) {
                    resolve(result.regionManagerID);
                }).catch(function (error) {
                    console.log(error);
                    reject(error);
                });
            } else {
                resolve(regionNumber);
            }
        });
    }
    
    async function writeToContacts(queryObj) {
        new Promise(function (resolve, reject) {
            models.Contact.create({
                firstName: queryObj.firstName,
                lastName: queryObj.lastName,
                phoneNumber: queryObj.phoneNumber,
                faxNumber: queryObj.faxNumber,
                streetAddress: queryObj.streetAddress,
                city: queryObj.city,
                state: queryObj.state,
                zip: queryObj.zip
            }).then(contact => {
                models.Store.create({
                    contactID: contact.contactID,
                    districtManagerID: queryObj.districtManagerID,
                    regionManagerID: queryObj.regionManagerID,
                    storeNumber: queryObj.storeNumber,
                    nursery: queryObj.nursery,
                    petWashStation: queryObj.petWashStation,
                    smallEngine: queryObj.smallEngine,
                    books: queryObj.books,
                    fishing: queryObj.fishing,
                    fishingAndGuns: queryObj.fishingAndGuns,
                    size: queryObj.size,
                    petSize: queryObj.petSize
                });
            }).catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    }

    async function parse4SQL() {
        try {
            let contact = await readXMLData('./fhContact.xml');
            let contactArrayList = await addSegments2Array(contact, []);
            let contactArrayListObjects = await createObjectFromSegment(contactArrayList);
            let store = await readXMLData('./fhStore.xml');
            let storeList = await addSegments2Array(store, []);
            let storeListObjects = await createObjectFromSegment(storeList);
            //Get the store object you mean to insert before inste
            let queryArray = await createNewStoreQuery(contactArrayListObjects, storeListObjects);
            queryArray.forEach(async function (queryObj) {
                new Promise(function (resolve, reject) {
                    getDistrictManagerID(queryObj.districtManagerID)
                        .then(result => {
                            queryObj.districtManagerID = result;
                            getRegionManagerID(queryObj.regionManagerID)
                                .then(result => {
                                    queryObj.regionManagerID = result;
                                    writeToContacts(queryObj);
                                });                                
                        })
                        .then(resolve())
                        .catch(function (err) {
                            reject(err);
                        });

                });
            });            
            res.send('Complete');
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }


    (async function () {
        await parse4SQL();
    })();
};