module.exports = (sequelize, Sequelize) => {
    const StoreTelecomNote = sequelize.define(
        'StoreTelecomNote',
        {
            storeTelecomNoteID: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            note: Sequelize.STRING(600),
            tech: Sequelize.STRING(50)
        }
    );
    StoreTelecomNote.associate = function (models) {
        models.StoreTelecomNote.belongsTo(models.Store, {
            foreignKey: 'storeID'
        }, {
                targetKey: 'storeID'
            });
    };
    return StoreTelecomNote;
};