const Sequelize = require('sequelize');
const db = require('./db');

const Car = db.define('cars', {
    car_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    model: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    registration_plate: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    fuel_type: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    transmission_type: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    kilometers_traveled: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    owner_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    photo_url: {
        type: Sequelize.STRING(255),
        allowNull: true 
    }
});

//Car.sync();

module.exports = Car;
