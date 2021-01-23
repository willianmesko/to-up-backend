import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AthleteWorkoutController from '@modules/athletes/infra/http/controllers/AthleteWorkoutController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const athleteWorkoutRouter = Router();
const athleteWorkoutController = new AthleteWorkoutController();

athleteWorkoutRouter.use(ensureAuthenticated);

athleteWorkoutRouter.get('/workout', athleteWorkoutController.show);

export default athleteWorkoutRouter;
