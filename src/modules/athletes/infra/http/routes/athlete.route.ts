import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AthletesController from '@modules/athletes/infra/http/controllers/AthletesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const atheleteRouter = Router();
const athletesController = new AthletesController();


atheleteRouter.use(ensureAuthenticated);
atheleteRouter.get('/', athletesController.list);
atheleteRouter.post('/', athletesController.create);

export default atheleteRouter;
