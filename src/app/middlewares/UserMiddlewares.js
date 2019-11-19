import * as Yup from 'yup';

export const createUser = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    email: Yup.string()
      .email()
      .required('e-mail is required'),
    password: Yup.string()
      .required('password is required')
      .min(6, 'The password must have among 6-10 characters')
      .max(10, 'The password must have among 6-10 characters'),
  });

  try {
    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res, next) => {
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

export const createUserInterest = async (req, res, next) => {
  const schema = Yup.object().shape({
    user_id: Yup.number().required('User ID is required'),
    interest_id: Yup.number().required('Interest ID is required'),
  });

  try {
    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
