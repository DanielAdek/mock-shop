import bcrypt from 'bcrypt';

const users = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Users.associate = (models) => {
    Users.hasMany(models.Products, {
      foreignKey: 'userId',
      as: 'products'
    });
    Users.hasMany(models.Carts, {
      foreignKey: 'userId',
      as: 'cart'
    });
  };

  Users.beforeValidate((user) => {
    user.password = user.password ? bcrypt.hashSync(user.password, 8) : null;
  });
  Users.comparePassword = (password, user) => bcrypt.compareSync(password, user);
  return Users;
};

export default users;
