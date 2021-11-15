const pkg = require('sequelize');
const pwoli = require('pwoli');
const sequelize = require('.');
const Model = pwoli.Model;
const DataTypes = pkg.DataTypes;
class Event extends Model {
    attributeLabels = {
        title: 'Title',
    };
}

const eventAttributes = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: 'id',
    },
    title: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: 'title',
    },
};
const eventOptions = {
    tableName: 'Event',
    comment: 'ss',
    sequelize,
    hooks: {},
};
Event.init(eventAttributes, eventOptions);
module.exports = Event;