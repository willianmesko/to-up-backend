import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import AthletesController from '@modules/athletes/infra/http/controllers/AthletesController';
import AthleteAvatarController from '@modules/athletes/infra/http/controllers/AthleteAvatarController';
import AthleteSignUpController from '@modules/athletes/infra/http/controllers/AthleteSignUpController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const athletesRouter = Router();
const athletesController = new AthletesController();
const athleteAvatarController = new AthleteAvatarController();
const athleteSignUpController = new AthleteSignUpController();
const upload = multer(uploadConfig.multer);

athletesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      sexo: Joi.number().required(),
      ethnicity: Joi.number(),
      age: Joi.number(),
      body_mass: Joi.number(),
      stature: Joi.number(),
      aerobic_profile: Joi.number(),
      training_level: Joi.number(),
      physical_activity: Joi.number(),
      objective: Joi.number(),
    },
  }),
  ensureAuthenticated,
  athletesController.create,
);
athletesRouter.get('/', ensureAuthenticated, athletesController.list);

athletesRouter.post('/signup', athleteSignUpController.create);

athletesRouter.patch(
  '/avatar/:athlete_id',
  ensureAuthenticated,
  upload.single('avatar'),
  athleteAvatarController.update,
);

export default athletesRouter;
