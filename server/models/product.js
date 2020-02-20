const products = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    inStock: {
      type: DataTypes.BOOLEAN
    }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Product.hasMany(models.Cart, {
      foreignKey: 'productId',
      as: 'carts'
    });
  };
  return Product;
};

export default products;
