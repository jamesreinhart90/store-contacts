module.exports = (sequelize, Sequelize) => {
    const RegionManager = sequelize.define(
        'RegionManager',
        {
            regionManagerID: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            regionNumber: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }
    );
    RegionManager.associate = function (models) {
        models.RegionManager.belongsTo(models.Contact, {
            foreignKey: 'contactID'
        }, {
            targetKey: 'contactID'
        });
    };
    return RegionManager;
};