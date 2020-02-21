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
      type: DataTypes.STRING
    }
  });

  Users.associate = (models) => {
    Users.hasMany(models.Product, {
      foreignKey: 'userId',
      as: 'products'
    });
    Users.hasMany(models.Cart, {
      foreignKey: 'userId',
      as: 'cart'
    });
  };

  Users.beforeValidate((user) => {
    user.password = user.password ? bcrypt.hashSync(user.password, 8) : null;
  });
  Users.comparePassword = (password, self) => bcrypt.compareSync(password, self.password);
  return Users;
};

export default users;
