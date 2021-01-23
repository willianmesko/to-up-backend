import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import UserAdressController from '@modules/users/infra/http/controllers/userAdressController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userAdressController = new UserAdressController()
const upload = multer(uploadConfig.multer);



usersRouter.get('/', usersController.index);
usersRouter.post('/', usersController.create);
usersRouter.post('/adress', ensureAuthenticated, userAdressController.put);
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);


export default usersRouter;
