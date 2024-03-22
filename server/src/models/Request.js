const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./User');
const Car = require('./Car');

const Request = db.define('requests', {
    request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'cars',
            key: 'car_id'
        }
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
    }
});

Request.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Request.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' });
Request.belongsTo(Car, { foreignKey: 'car_id', as: 'car' });

//Request.sync(); // Criar a tabela

module.exports = Request;
