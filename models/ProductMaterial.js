const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ProductMaterial extends Model {}

ProductMaterial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    material_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "material",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "product_material",
  }
);

module.exports = ProductMaterial;
