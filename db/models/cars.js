'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cars.belongsTo(models.users, { foreignKey: 'userId', as: 'owner' });

      // For many to many 
      // Car model
      Cars.belongsToMany(models.Tag, {
        through: 'CarTags', // Junction table
        foreignKey: 'carId', // Foreign key in the junction table
        as: 'tags'          // Alias to access the associated tags
      });
    }
  }
  Cars.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    launched: DataTypes.BOOLEAN,
    userId: { // Add the userId field
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // Name of the Users table
        key: 'id' // The key in the Users table
      }
    }
  }, {
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};