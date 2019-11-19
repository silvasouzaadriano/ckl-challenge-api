import * as Yup from 'yup';

const title = Yup.string().max(100, 'The title cannot exceed 100 characters.');
const description = Yup.string().max(
  650,
  'The description cannot exceed 650 characters.'
);
const owner = Yup.string().max(
  100,
  'The owner name cannot exceed 100 characters.'
);

export const createNews = async (req, res, next) => {
  const schema = Yup.object().shape({
    interest_id: Yup.number().required('Interest is required!'),
    title: title.required('Title is required!'),
    description: description.required('Description is required!'),
    owner: owner.required('Owner name is required!'),
  });
  try {
    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateNews = async (req, res, next) => {
  const schema = Yup.object().shape({
    interest_id: Yup.number().required('Interest is required!'),
    title: title.required('Title is required!'),
    description: description.required('Description is required!'),
    owner: owner.required('Owner name is required!'),
  });

  try {
    /* it's necessary to send the body */
    // eslint-disable-next-line no-throw-literal
    if (Object.keys(req.body).length === 0) throw 'Body does not sent';

    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
