// models/Order.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: { // Basic contact info - using phone number as ID for simplicity
        type: DataTypes.STRING,
        allowNull: false,
    },
    items: { // Array of ordered item IDs and quantities (referencing MongoDB)
        type: DataTypes.JSONB,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    orderStatus: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

export default Order;