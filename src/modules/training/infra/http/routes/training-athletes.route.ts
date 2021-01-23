import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TrainingAthletesController from '@modules/training/infra/http/controllers/TrainingAthletesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const trainingAthleteRouter = Router();
const trainingAthletesController = new TrainingAthletesController();

trainingAthleteRouter.use(ensureAuthenticated);

trainingAthleteRouter.post('/athletes', trainingAthletesController.create);


export default trainingAthleteRouter;
