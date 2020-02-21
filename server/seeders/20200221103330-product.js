module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Products', [{
    userId: 1,
    item: 'T-shirt',
    description: 'Nice t-shirt',
    category: 'fashion',
    inStock: true,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    createdAt: '2020-02-20',
    updatedAt: '2020-02-20'
  },
  {
    userId: 2,
    item: 'T-shirt',
    description: 'Nice t-shirt',
    category: 'fashion',
    inStock: true,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    createdAt: '2020-02-20',
    updatedAt: '2020-02-20'
  },
  {
    userId: 3,
    item: 'T-shirt',
    description: 'Nice t-shirt',
    category: 'fashion',
    inStock: true,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    createdAt: '2020-02-20',
    updatedAt: '2020-02-20'
  },
  {
    userId: 4,
    item: 'T-shirt',
    description: 'Nice t-shirt',
    category: 'fashion',
    inStock: true,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    createdAt: '2020-02-20',
    updatedAt: '2020-02-20'
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('Users')
};
