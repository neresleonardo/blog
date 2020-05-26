import { Router } from 'express';
import multer from 'multer';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import PostController from './app/controllers/PostController';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/new/post', PostController.store);
routes.get('/list/posts', PostController.index);

export default routes;
