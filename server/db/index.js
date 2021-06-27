const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

class Task extends Model { }
class User extends Model { }

Task.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        default: false
        // allowNull defaults to true
    }
}, {
    sequelize,
    modelName: 'Task',
    freezeTableName: true
});

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    twitchId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
});

User.hasMany(Task, { as: 'tasks' });
Task.belongsTo(User);

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error('Unable to sync models:', error);
    }
})();

module.exports = {
    User, Task
}