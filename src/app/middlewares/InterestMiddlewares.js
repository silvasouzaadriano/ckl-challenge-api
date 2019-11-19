import * as Yup from 'yup';

const name = Yup.string().max(55, 'The name cannot exceed 55 characters.');

export const createInterest = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: name.required('The name is required!'),
  });
  try {
    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateInterest = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('name is required'),
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
