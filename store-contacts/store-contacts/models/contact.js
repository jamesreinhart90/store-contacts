module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define(
        'Contact',
        {
            contactID: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: Sequelize.STRING(50),
                get() {
                    if (this.getDataValue('firstName') !== null) {
                        return this.getDataValue('firstName');
                    }
                    return '';
                }
            },
            lastName: {
                type: Sequelize.STRING(50),
                get() {
                    if (this.getDataValue('lastName') !== null) {
                        return this.getDataValue('lastName');
                    }
                    return '';
                }
            },
            phoneNumber: {
                type: Sequelize.STRING(10),
                get() {
                    var cleaned = ('' + this.getDataValue('phoneNumber')).replace(/\D/g, '');
                    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
                    if (match) {
                        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
                    }
                    return '';
                }
            },
            faxNumber: {
                type: Sequelize.STRING(10),
                get() {
                    var cleaned = ('' + this.getDataValue('faxNumber')).replace(/\D/g, '');
                    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
                    if (match) {
                        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
                    }
                    return '';
                }
            },
            streetAddress: Sequelize.STRING(50),
            city: Sequelize.STRING(50),
            state: Sequelize.STRING(2),
            zip: Sequelize.STRING(9)
        
        },
        {
            name: {
                singular: 'Contact',
                plural: 'Contacts'
            }
        }
    );
    return Contact;
};