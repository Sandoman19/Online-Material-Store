const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Material extends Model {}

Material.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
      type: DataTypes.STRING,
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
    // addd images?
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
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
