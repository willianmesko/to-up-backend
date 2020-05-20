import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RoutinesController from '@modules/training/infra/http/controllers/RoutinesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routinesRouter = Router();
const routinesController = new RoutinesController();

routinesRouter.use(ensureAuthenticated);
routinesRouter.post('/', routinesController.create);

export default routinesRouter;
