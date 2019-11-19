import News from '../models/News';
import File from '../models/File';
import Interest from '../models/Interest';

class NewsController {
  async index(req, res) {
    let where;

    if (req.query.interest_id) {
      where = { interest_id: req.query.interest_id };
    }

    const news = await News.findAll({
      where,
      order: [['created_at', 'ASC']],
      include: [
        {
          model: Interest,
          as: 'interest',
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: File,
          as: 'ownerbanner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    const newsList = news.map(n => ({
      ...n.toJSON(),
    }));

    return res.status(200).json(newsList);
  }

  async show(req, res) {
    const { id } = req.params;

    const news = await News.findByPk(id, {
      include: [
        {
          model: Interest,
          as: 'interest',
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: File,
          as: 'ownerbanner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!news) return res.status(400).json({ error: 'News does not exits' });

    const { title, description, interest, banner, ownerbanner } = news;

    return res.status(200).json({
      id,
      title,
      description,
      interest,
      banner,
      ownerbanner,
    });
  }

  async store(req, res) {
    const {
      interest_id,
      banner_id,
      title,
      description,
      owner,
      owner_banner_id,
    } = req.body;

    /* VERIFYING THE INTEREST */
    if (interest_id) {
      const interest = await Interest.findByPk(interest_id);
      if (!interest)
        return res.status(400).json({ error: 'Interest does not exists' });
    }

    /* VERIFYING THE BANNER */
    if (banner_id) {
      const image = await File.findByPk(banner_id);
      if (!image)
        return res.status(400).json({ error: 'Banner does not exists' });
      if (image.type !== 'banner')
        return res.status(400).json({ error: 'Your picture must be a banner' });
    }

    /* VERIFYING THE OWNER BANNER */
    if (owner_banner_id) {
      const ownerimage = await File.findByPk(owner_banner_id);
      if (!ownerimage)
        return res.status(400).json({ error: 'Picture does not exists' });
      if (ownerimage.type !== 'avatar')
        return res
          .status(400)
          .json({ error: 'Your picture must be an avatar' });
    }

    /* CREATING THE NEWS */
    const news = await News.create({
      interest_id,
      banner_id,
      title,
      description,
      owner,
      owner_banner_id,
    });

    return res.status(201).json(news);
  }

  async update(req, res) {
    const news = await News.findOne({ where: { id: req.params.id } });
    const {
      interest_id,
      banner_id,
      title,
      description,
      owner,
      owner_banner_id,
    } = req.body;

    try {
      if (!news) throw new Error('News does not exists');

      /* VERIFYING THE INTEREST */
      if (interest_id && interest_id !== news.interest_id) {
        const interest = await Interest.findByPk(interest_id);
        if (!interest) throw new Error('Interest does not exists');
      }

      /* VERIFYING THE BANNER */
      if (banner_id && banner_id !== news.banner_id) {
        const image = await File.findByPk(banner_id);
        if (!image) throw new Error('Banner does not exists');
        if (image.type !== 'banner')
          throw new Error('Your picture must be a banner');
      }

      /* VERIFYING THE OWNER BANNER */
      if (owner_banner_id && owner_banner_id !== news.owner_banner_id) {
        const ownerimage = await File.findByPk(banner_id);
        if (!ownerimage) throw new Error('Owner Banner does not exists');
        if (ownerimage.type !== 'avatar')
          throw new Error('Your picture must be an avatar');
      }
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    await news.update(req.body);

    const { id, interest, banner, ownerbanner } = await News.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Interest,
            as: 'interest',
            attributes: ['id', 'name'],
          },
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'path', 'url'],
          },
          {
            model: File,
            as: 'ownerbanner',
            attributes: ['id', 'path', 'url'],
          },
        ],
      }
    );

    return res.status(200).json({
      id,
      interest,
      banner,
      title,
      description,
      owner,
      ownerbanner,
    });
  }

  async delete(req, res) {
    const news = await News.findOne({ where: { id: req.params.id } });

    try {
      if (!news) throw new Error('This news does not exists!');
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    await news.destroy();

    return res.status(200).send();
  }
}

export default new NewsController();
