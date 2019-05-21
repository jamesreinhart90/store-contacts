/* Get all stores on page load */
$(window).on('load', function () {
    // Search all stores
    $.get('/stores/findAllStores', function (stores) {
        // Pass returned variable to create table function
        createTable(stores);
    });    
});

/* Find a store on Store Number Search */
function searchStore(storeNumber) {
    //Clear Form
    $('#region').prop('selectedIndex', 0);
    $('#district').prop('selectedIndex', 0);

    // If empty
    if (storeNumber === '' || storeNumber === null) {
        // Search all stores
        $.get('/stores/findAllStores', function (stores) {
            // Pass returned variable to create table function
            createTable(stores);
        });
    } else {
        // Send Post Request
        $.get('/stores/findStoreByStoreNumber/' + storeNumber, function (stores) {
            createTable(stores);
        });
    }    
}

/* Find stores by district */
function searchDistrict(districtID) {
    //Clear Form
    $('#region').prop('selectedIndex', 0);
    $('#store').prop('value', '');
    //Send Post Request
    $.get('/stores/findStoreByDistrictManagerID/' + districtID, function (stores) {
        createTable(stores);
    });
}

/* Find stores by region */
function searchRegion(regionID) {
    //Clear Form
    $('#district').prop('selectedIndex', 0);
    $('#store').prop('value', '');
    //Send Post Request
    $.get('/stores/findStoreByRegionManagerID/' + regionID, function (stores) {
        createTable(stores);
    });
}

/* Create table with store search */
function createTable(stores) {
    // Clear Table
    $('#table').empty();

    // check if array
    if (stores !== undefined && stores.length > 0) {
        // Loop through stores array
        stores.forEach(store => {
            // Clean null values so they dont show up as null
            if (store.storeRM === null) {
                store.storeRM = {
                    regionNumber: ''
                };
            }
            if (store.storeDM === null) {
                store.storeDM = {
                    districtNumber: ''
                };
            }
            //Add html to table with store info
            $('#table').append('<div class="container-fluid"><a id="tableItem" href="/stores/' + store.storeNumber + '"><div class="row"><div class= "col">Store: ' + store.storeNumber + '</div><div class="col">Phone: ' + store.storeContact.phoneNumber + '</div><div class="col">' + store.storeContact.streetAddress + '</div></div><div class="row"><div class="col">District: ' + store.storeDM.districtNumber + '</div><div class="col">Fax: ' + store.storeContact.faxNumber + '</div><div class="col">' + store.storeContact.city + ', ' + store.storeContact.state + ' ' + store.storeContact.zip + '</div></div><div class="row"><div class="col">Region: ' + store.storeRM.regionNumber + '</div><div class="col">Manager: ' + store.storeContact.firstName + ' ' + store.storeContact.lastName + '</div><div class="col"></div></div></a></div>');
        });
    } else {
        $('#table').append('<div class="container-fluid"><h4 style="color: red;">There are no stores with that store number.</h4></div>');
    }
}

// Go back to prior page
function goBack() {
    window.history.back();
}