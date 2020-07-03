import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TrainingController from '@modules/training/infra/http/controllers/TrainingController';
import TrainingAthletesController from '@modules/training/infra/http/controllers/TrainingAthletesController';
import TrainingDuplicateController from '@modules/training/infra/http/controllers/TrainingDuplicateController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const trainingRouter = Router();
const trainingController = new TrainingController();
const trainingAthletesController = new TrainingAthletesController();
const trainingDuplicateController = new TrainingDuplicateController();

trainingRouter.use(ensureAuthenticated);
trainingRouter.post('/', trainingController.create);
trainingRouter.get('/', trainingController.index);
trainingRouter.get('/:training_id', trainingController.show);
trainingRouter.post('/athletes', trainingAthletesController.create);
trainingRouter.post(
  '/duplicate/:training_id',
  trainingDuplicateController.create,
);

export default trainingRouter;
