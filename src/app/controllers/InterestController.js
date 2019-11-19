import Interest from '../models/Interest';

class InterestController {
  async index(req, res) {
    let where;

    const interests = await Interest.findAll({
      where,
    });

    const interestList = interests.map(i => ({
      ...i.toJSON(),
    }));

    return res.status(200).json(interestList);
  }

  async store(req, res) {
    const { name } = req.body;

    /* CREATING THE INTEREST */
    const interest = await Interest.create({
      name,
    });

    return res.status(201).json(interest);
  }

  async update(req, res) {
    const interest = await Interest.findOne({ where: { id: req.params.id } });
    const { name } = req.body;

    try {
      if (!interest) throw new Error('Interest does not exists');

      /* verifying if name already exist */
      const interestExist = await Interest.findOne({
        where: { name },
      });
      if (interestExist) {
        return res.status(422).json({ error: 'Interests already exists!' });
      }
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    await interest.update(req.body);

    const { id } = await Interest.findByPk(req.params.id);

    return res.status(200).json({
      id,
      name,
    });
  }

  async delete(req, res) {
    const interest = await Interest.findOne({ where: { id: req.params.id } });

    try {
      if (!interest) throw new Error('This interest does not exist!');

      await interest.destroy();

      return res.status(200).send();
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

export default new InterestController();
