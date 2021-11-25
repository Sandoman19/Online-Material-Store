const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Material extends Model {}

Material.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finish: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thickness: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },   
    brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'brand',
        key: 'id',
      },
    },

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "material",
  }
);

module.exports = Material;
