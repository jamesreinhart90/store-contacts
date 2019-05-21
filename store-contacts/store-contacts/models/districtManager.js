module.exports = (sequelize, Sequelize) => {
    const DistrictManager = sequelize.define(
        'DistrictManager',
        {
            districtManagerID: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            districtNumber: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }
    );
    DistrictManager.associate = function (models) {
        models.DistrictManager.belongsTo(models.Contact, {
            foreignKey: 'contactID'
        }, {
                targetKey: 'contactID'
            });
    };
    return DistrictManager;
};