import User from '../models/User';

class UserController {
  async index(req, res) {
    let where;

    const users = await User.findAll({
      where,
    });

    const userList = users.map(i => ({
      ...i.toJSON(),
    }));

    return res.status(200).json(userList);
  }

  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(400).json({ error: 'Esse email já foi registrado!' });
    }
    const user = await User.create(req.body);
    const { id, name, email } = user;

    return res.status(201).json({
      user: {
        id,
        name,
        email,
      },
      token: user.generateToken(),
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    /* verifying if email already exist */
    if (email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });
      if (userExist) {
        return res.status(422).json({ error: 'Usuário já existe!' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha não corresponde' });
    }

    await user.update(req.body);

    const { id, name } = await User.findByPk(req.userId);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
