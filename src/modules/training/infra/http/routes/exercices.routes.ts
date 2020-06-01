import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ExercicesController from '@modules/training/infra/http/controllers/ExercicesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const exercicesRouter = Router();
const exercicesController = new ExercicesController();

exercicesRouter.use(ensureAuthenticated);
exercicesRouter.post('/', exercicesController.create);

exercicesRouter.get('/', exercicesController.index);

export default exercicesRouter;
