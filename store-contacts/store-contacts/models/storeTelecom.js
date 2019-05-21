module.exports = (sequelize, Sequelize) => {
    const StoreTelecom = sequelize.define(
        'StoreTelecom',
        {
            storeTelecomID: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            speedDialNumber: Sequelize.INTEGER,
            rollOver: Sequelize.STRING(10),
            alternate1: Sequelize.STRING(50),
            alternate2: Sequelize.STRING(50),
            burglarAlarm: Sequelize.STRING(10),
            fireAlarm: Sequelize.STRING(10),
            fireAlarm2: Sequelize.STRING(10),
            localTelephoneCompany: Sequelize.STRING,
            localTollCarrier: Sequelize.STRING,
            interstateCarrier: Sequelize.STRING,
            telcomNotes: Sequelize.STRING(600),
            datacomNotes: Sequelize.STRING(600),
            tollFree: Sequelize.STRING(50),
            budgetNeeds: Sequelize.STRING(600),
            internetServiceProvider: Sequelize.STRING(50),
            ipAddress: Sequelize.STRING(15),
            phoneSystemInstallDate: Sequelize.STRING(10),
            telephoneSystem: {
                type: 'BIT'
            }
        }
    );
    StoreTelecom.associate = function (models) {
        models.StoreTelecom.belongsTo(models.Store, {
            foreignKey: 'storeID'
        }, {
            targetKey: 'storeID'
        });
    };

    return StoreTelecom;
};