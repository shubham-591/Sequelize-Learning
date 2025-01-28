'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Tag model
      Tag.belongsToMany(models.Cars, {
        through: 'CarTags', // Junction table
        foreignKey: 'tagId', // Foreign key in the junction table
        as: 'cars'          // Alias to access the associated cars
      });
    }
  }
  Tag.init({
    name: DataTypes.STRING,
    // allowNull: false,
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};