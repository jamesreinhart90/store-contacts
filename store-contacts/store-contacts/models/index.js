const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let db = {};
let sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    dialect: 'mssql'
});

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf(".") !== 0) && (file !== 'index.js'))
    .forEach(file => {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;