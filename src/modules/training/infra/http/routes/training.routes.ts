import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TrainingController from '@modules/training/infra/http/controllers/TrainingController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const trainingRouter = Router();
const trainingController = new TrainingController();

trainingRouter.use(ensureAuthenticated);
trainingRouter.post('/', trainingController.create);
trainingRouter.get('/', trainingController.index);
trainingRouter.get('/:training_id', trainingController.show);

export default trainingRouter;
