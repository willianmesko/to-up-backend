import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AthleteAvatarController from '@modules/athletes/infra/http/controllers/AthleteAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const atheleteAvatarRouter = Router();
const athleteAvatarController = new AthleteAvatarController();

atheleteAvatarRouter.use(ensureAuthenticated);
atheleteAvatarRouter.patch('/avatar/:athlete_id', athleteAvatarController.update);


export default atheleteAvatarRouter;
