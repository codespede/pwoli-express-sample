const pkg = require('sequelize');
const pwoli = require('pwoli');
const sequelize = require('.');
const Model = pwoli.Model;
const DataTypes = pkg.DataTypes;
const Event = require("./Event");
class Company extends Model{
    static associate() {
        Company.hasOne(Event, { as: 'event', foreignKey: 'id', sourceKey: 'eventId', constraints: false });
    }
  
    get getter() {
        return (async () => {
            return (await Event.findByPk(this.eventId)).title;
        })();
    }
  
    sampleFunc() {
        return this.id + Math.random();
    }
  
    search(params) {
        let provider = super.search.call(this, params); // calling the default implementation of search
        for (const param in params[this.getFormName()]) {
            if (['event.title'].includes(param)) {
                provider.query.where[`$${param}$`] = { [pkg.Op.like]: `%${params[this.getFormName()]['event.title']}%` };
                this[param] = params[this.getFormName()][param];
            }
        }
        return provider;
    }
}

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: null,
    field: "id",
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "title",
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: "1",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "status",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "description",
    sdfdf:'sdfsdf',
    validate: {
      length(value) {
        // console.log(value);
        if (value.length > 350)
          throw new Error('Only 350 characters are allowed');
      }
    }
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "phone",
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "email",
    validate: {
      isEmail: true,
    },
  },
  website: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "website",
  },
  eventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'eventId',
      references: {
          key: 'id',
          model: 'event',
      },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "createdAt",
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "updatedAt",
  },
};

const { Sequelize } = pkg;
const options = {
  tableName: "company",
  comment: "ss",
  indexes: [
    {
      name: "company-event",
      unique: false,
      // type: "BTREE",
      fields: ["eventId"],
    },
  ],
  sequelize,
  hooks: {}
};
console.log('company', Model)
Company.init(attributes, options);
module.exports = Company;
Company.associate();
