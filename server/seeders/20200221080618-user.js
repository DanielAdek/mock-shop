const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    userName: 'Admin',
    firstName: 'Daniel',
    lastName: 'Adekunle',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('password', 8),
    isAdmin: true,
    createdAt: '2020-02-20',
    updatedAt: '2020-02-20'
  },
  {
    userName: 'postman',
    firstName: 'Daniel',
    lastName: 'Adekunle',
    email: 'daniel.adek.k@gmail.com',
    password: bcrypt.hashSync('password', 8),
    isAdmin: false,
    createdAt: '2020-02-20',
    updatedAt: '2020-02-20'
  },
  {
    userName: 'postman2',
    firstName: 'Daniel',
    lastName: 'Adekunle',
    email: 'maildaniel.me3@gmail.com',
    password: bcrypt.hashSync('password', 8),
    isAdmin: false,
    createdAt: '2020-02-20',
    updatedAt: '2020-02-20'
  },
  {
    userName: 'postman3',
    firstName: 'Daniel',
    lastName: 'Adekunle',
    email: 'maildaniel.me4@gmail.com',
    password: bcrypt.hashSync('password', 8),
    isAdmin: false,
    createdAt: '2020-02-20',
    updatedAt: '2020-02-20'
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('Users')
};
