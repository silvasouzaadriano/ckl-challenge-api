import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

/* CONTROLLERS */
import UserController from './app/controllers/UserController';
import UserInterestController from './app/controllers/UserInterestController';
import SessionController from './app/controllers/SessionController';
import InterestController from './app/controllers/InterestController';
import FileController from './app/controllers/FileController';
import NewsController from './app/controllers/NewsController';

/* MIDDLEWARES */
import { authMiddleware, authCreateSession } from './app/middlewares/auth';
import {
  createUser,
  updateUser,
  createUserInterest,
} from './app/middlewares/UserMiddlewares';
import {
  createInterest,
  updateInterest,
} from './app/middlewares/InterestMiddlewares';
import { createNews } from './app/middlewares/NewsMiddlewares';

const routes = new Router();
const uploads = multer(multerConfig);

/* USER AND SESSION */
routes.post('/users', createUser, UserController.store);
routes.post('/sessions', authCreateSession, SessionController.store);

// routes.use(authMiddleware);

routes.get('/', (req, res) =>
  res.json({
    Users: 'http://167.172.254.115/users',
    Files: 'http://167.172.254.115/files',
    Interests: 'http://167.172.254.115/interests',
    News: 'http://167.172.254.115/news',
  })
);

/* USER */
routes.put('/users', updateUser, UserController.update);
routes.get('/users', UserController.index);

/* INTERESTS */
routes.post('/interests', createInterest, InterestController.store);
routes.get('/interests', InterestController.index);
routes.put('/interests/:id', updateInterest, InterestController.update);
routes.delete('/interests/:id', InterestController.delete);

/* USER INTERESTS */
routes.post('/userinterests', createUserInterest, UserInterestController.store);
routes.get('/userinterests/:id', UserInterestController.index);
routes.delete('/userinterests/:id', UserInterestController.delete);

/* FILES */
routes.post('/files', uploads.single('file'), FileController.store);
routes.get('/files', FileController.index);

/* NEWS */
routes.post('/news', createNews, NewsController.store);
routes.get('/news', NewsController.index);
routes.put('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.delete);
routes.get('/news/:id', NewsController.show);

export default routes;
