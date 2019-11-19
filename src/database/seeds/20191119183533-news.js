const news = [
  {
    id: 1,
    interest_id: 1,
    banner_id: 1,
    title: 'Obama Offers Hopeful Vision While Noting Nation’s Fears',
    description: 'Obama Offers Hopeful Vision While Noting Nation’s Fears',
    owner: 'Creed Bratton',
    owner_banner_id: 4,
    updated_at: '2019-11-19T18:00:01.000Z',
    created_at: '2019-11-19T18:00:01.000Z',
  },
  {
    id: 2,
    interest_id: 3,
    banner_id: 2,
    title:
      'Didi Kuaidi, The Company Beating Uber In China, Opens Its API To Third Party Apps',
    description:
      'One day after Uber updated its API to add ‘content experiences’ for passengers, the U.S. company’s biggest rival — Didi Kuaidi in China — has opened its own platform up by releasing an SDK for developers and third-parties.',
    owner: 'Creed Bratton',
    owner_banner_id: 4,
    updated_at: '2019-11-19T18:00:02.000Z',
    created_at: '2019-11-19T18:00:02.000Z',
  },
  {
    id: 3,
    interest_id: 4,
    banner_id: 3,
    title: 'NASA Formalizes Efforts To Protect Earth From Asteroids',
    description:
      'Last week, NASA announced a new program called the Planetary Defense Coordination Office (PDCO) which will coordinate NASA’s efforts for detecting and tracking near-Earth objects (NEOs). If a large object comes hurtling toward our planet…',
    owner: 'Alexandre Henrique Shailesh Zeta-Jones',
    owner_banner_id: 4,
    updated_at: '2019-11-19T18:00:03.000Z',
    created_at: '2019-11-19T18:00:03.000Z',
  },
  {
    id: 4,
    interest_id: 5,
    banner_id: null,
    title: 'For Some Atlanta Hawks, a Revved-Up Game of Uno Is Diversion No. 1',
    description:
      'The favored in-flight pastime of a group of players including Al Horford, Kent Bazemore and Dennis Schroder is a schoolchildren’s card game with some added twists.',
    owner: 'Creed Bratton',
    owner_banner_id: 4,
    updated_at: '2019-11-19T18:00:04.000Z',
    created_at: '2019-11-19T18:00:04.000Z',
  },
  {
    id: 5,
    interest_id: 3,
    banner_id: null,
    title: 'Picking a Windows 10 Security Package',
    description:
      'Oscar the Grouch has a recycling bin and Big Bird has moved to a tree as the children’s classic debuts on HBO, aiming at a generation that doesn’t distinguish between TV and mobile screens.',
    owner: 'Creed Bratton',
    owner_banner_id: 4,
    updated_at: '2019-11-19T18:00:05.000Z',
    created_at: '2019-11-19T18:00:05.000Z',
  },
  {
    id: 6,
    interest_id: 4,
    banner_id: null,
    title: 'As U.S. Modernizes Nuclear Weapons, ‘Smaller’ Leaves Some Uneasy',
    description:
      'The Energy Department and the Pentagon have been readying a weapon with a build-it-smaller approach, setting off a philosophical clash in the world of nuclear arms.',
    owner: 'Creed Bratton',
    owner_banner_id: 4,
    updated_at: '2019-11-19T18:00:06.000Z',
    created_at: '2019-11-19T18:00:06.000Z',
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('news', news, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "news_id_seq" RESTART WITH ${news.length + 1}`
    );
  },
  down: queryInterface => queryInterface.bulkDelete('news', null, {}),
};
