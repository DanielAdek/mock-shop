const carts = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Cart.belongsTo(models.Users, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });
  };
  return Cart;
};

export default carts;
