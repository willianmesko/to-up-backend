import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TrainingDuplicateController from '@modules/training/infra/http/controllers/TrainingDuplicateController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const trainingDuplicateRouter = Router();
const trainingDuplicateController = new TrainingDuplicateController();

trainingDuplicateRouter.use(ensureAuthenticated);

trainingDuplicateRouter.post('/duplicate/:training_id', trainingDuplicateController.create);


export default trainingDuplicateRouter;
