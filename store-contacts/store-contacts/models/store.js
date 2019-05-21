module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define(
        'Store',
        {
            storeID: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            storeNumber: {
                type: Sequelize.INTEGER,
                get() {
                    var s = this.getDataValue('storeNumber') + '';
                    while (s.length < 3) s = '0' + s;
                    return s;
                }
            },
            nursery: {
                type: 'BIT'
            },
            petWashStation: {
                type: 'BIT'
            },
            smallEngine: {
                type: 'BIT'
            },
            books: {
                type: 'BIT'
            },
            fishing: {
                type: 'BIT'
            },
            fishingAndGuns: {
                type: 'BIT'
            },
            size: {
                type: Sequelize.STRING(5)
            },
            petSize: {
                type: Sequelize.STRING(5)
            }
        }, {
            name: {
                singular: 'store',
                plural: 'stores'
            }
        }
    );
    Store.associate = function (models) {
        models.Store.belongsTo(models.Contact, {
            as: 'storeContact',
            foreignKey: 'contactID'
        }, {
            targetKey: 'contactID'
        });
        models.Store.belongsTo(models.DistrictManager, {
            as: 'storeDM',
            foreignKey: 'districtManagerID'
        }, {
            targetKey: 'districtManagerID'
        });
        models.Store.belongsTo(models.RegionManager, {
            as: 'storeRM',
            foreignKey: 'regionManagerID'
        }, {
            targetKey: 'regionManagerID'
        });
    };
    return Store;
};
