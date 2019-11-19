const date = new Date();

const file = [
  {
    id: 1,
    name: 'news_01.jpg',
    path: 'example/news_01.jpg',
    type: 'banner',
    created_at: date,
    updated_at: date,
  },
  {
    id: 2,
    name: 'news_02.jpg',
    path: 'example/news_02.jpg',
    type: 'banner',
    created_at: date,
    updated_at: date,
  },
  {
    id: 3,
    name: 'news_03.jpg',
    path: 'example/news_03.jpg',
    type: 'banner',
    created_at: date,
    updated_at: date,
  },
  {
    id: 4,
    name: 'creed-bratton.jpeg',
    path: 'example/creed-bratton.jpeg',
    type: 'avatar',
    created_at: date,
    updated_at: date,
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('files', file, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "files_id_seq" RESTART WITH ${file.length + 1}`
    );
  },
  down: queryInterface => queryInterface.bulkDelete('files', null, {}),
};
