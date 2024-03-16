const Sequelize = require('sequelize');
const db = require('./db');
const Request = require('./Request');

const Allocation = db.define('allocations', {
    allocation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'requests',
            key: 'request_id'
        }
    },
    status: {
        type: Sequelize.ENUM('active', 'completed'),
        allowNull: false,
        defaultValue: 'active'
    }
});

Allocation.belongsTo(Request, { foreignKey: 'request_id', as: 'request' });

//Allocation.sync(); // Criar a tabela

module.exports = Allocation;
