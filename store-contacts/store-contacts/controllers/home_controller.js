var router = require('express').Router();
var queries = require('../queries/queries');

router.home = function (req, res) {
    async function gatherData() {
        try {
            // Get District and Region Info from queries
            var districts = await queries.findAllDistricts;
            var regions = await queries.findAllRegions;

            // Show home page
            res.render('index', {
                title: 'Store Contacts',
                districts: districts,
                regions: regions
            });
        } catch (err) {
            console.log(err);
        }
    }
    (async () => {
        await gatherData();
    })();
};

module.exports = router;