const pkg = require('sequelize');
const pwoli = require('pwoli');
const Model = pwoli.Model;
const DataTypes = pkg.DataTypes;
class Company extends Model{
    
}

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: null,
    field: "id",
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "title",
  },
  media: {
    type: DataTypes.VIRTUAL,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
  },
  predefinedChatQueries: {
    type: DataTypes.VIRTUAL,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
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
  logoPath: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "logoPath",
  },
  exhibitionLogoPath: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "exhibitionLogoPath",
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "eventId",
    references: {
      key: "id",
      model: "Event",
    },
  },
  exhibitorEmail: {
    type: DataTypes.VIRTUAL,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
  },
  brochurePath: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "brochurePath",
  },
  bgImage: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "bgImage",
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
  fax: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "fax",
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "email",
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "address",
  },
  primaryContact: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "primaryContact",
  },
  isFeatured: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "isFeatured",
  },
  linkedInUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "linkedInUrl",
  },
  fbUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "fbUrl",
  },
  twitterUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "twitterUrl",
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
  position: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "position",
  },
  removedExhibitors: {
    type: DataTypes.VIRTUAL,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
  },
  removedMedia: {
    type: DataTypes.VIRTUAL,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
  },
  exhibitors: {
    type: DataTypes.VIRTUAL,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
  },
};

const { Sequelize } = pkg;
let sequelize;
const config = {
    "username": 'root2',
    "password": 'root',
    "database": 've',
    "host": '127.0.0.1',
    "dialect": "mysql"
};
sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
const options = {
  tableName: "Company",
  comment: "ss",
  sequelize,
  hooks: {}
};
console.log('company', Model)
Company.init(attributes, options);
module.exports = Company;