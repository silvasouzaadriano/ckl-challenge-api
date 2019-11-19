import UserInterest from '../models/UserInterest';
import User from '../models/User';
import Interest from '../models/Interest';

class UserInterestController {
  async index(req, res) {
    const where = { user_id: req.params.id };

    console.log(where);

    const userinterests = await UserInterest.findAll({
      where,
      include: [
        {
          model: Interest,
          as: 'interest',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['name'],
        },
      ],
    });

    const userInterestList = userinterests.map(i => ({
      ...i.toJSON(),
    }));

    return res.status(200).json(userInterestList);
  }

  async store(req, res) {
    const { user_id, interest_id } = req.body;
    /* VERIFYING THE USER */
    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user) return res.status(400).json({ error: 'User does not exist' });
    }
    /* VERIFYING THE INTEREST */
    if (interest_id) {
      const interest = await Interest.findByPk(interest_id);
      if (!interest)
        return res.status(400).json({ error: 'Interest does not exist' });
    }

    /* CREATING THE USER/INTEREST */
    const userinterest = await UserInterest.create({
      user_id,
      interest_id,
    });

    return res.status(201).json(userinterest);
  }

  async delete(req, res) {
    const userinterest = await UserInterest.findOne({
      where: { id: req.params.id },
    });

    try {
      if (!userinterest) throw new Error('This user/interest does not exist!');

      await userinterest.destroy();

      return res.status(200).send();
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

export default new UserInterestController();
