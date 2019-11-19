import File from '../models/File';

class FileController {
  async index(req, res) {
    let where;

    const files = await File.findAll({
      where,
    });

    const fileList = files.map(i => ({
      ...i.toJSON(),
    }));

    return res.status(200).json(fileList);
  }

  async store(req, res) {
    const { type } = req.body;

    switch (type) {
      case 'avatar':
      case 'banner':
        break;
      default:
        return res.status(400).json({ error: 'File type is invalid' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
      type,
    });

    return res.status(201).json(file);
  }
}

export default new FileController();
