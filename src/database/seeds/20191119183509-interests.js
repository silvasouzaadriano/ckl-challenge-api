const date = new Date();

const interests = [
  {
    id: 1,
    name: 'POLITICS',
    created_at: date,
    updated_at: date,
  },
  {
    id: 2,
    name: 'BUSINESS',
    created_at: date,
    updated_at: date,
  },
  {
    id: 3,
    name: 'TECH',
    created_at: date,
    updated_at: date,
  },
  {
    id: 4,
    name: 'SCIENCE',
    created_at: date,
    updated_at: date,
  },
  {
    id: 5,
    name: 'SPORTS',
    created_at: date,
    updated_at: date,
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('interests', interests, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "interests_id_seq" RESTART WITH ${interests.length + 1}`
    );
  },
  down: queryInterface => queryInterface.bulkDelete('interests', null, {}),
};
