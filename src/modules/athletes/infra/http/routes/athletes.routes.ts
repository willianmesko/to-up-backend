import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import AthletesController from '@modules/athletes/infra/http/controllers/AthletesController';
import AthleteAvatarController from '@modules/athletes/infra/http/controllers/AthleteAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const athletesRouter = Router();
const athletesController = new AthletesController();
const athleteAvatarController = new AthleteAvatarController();
const upload = multer(uploadConfig.multer);

athletesRouter.use(ensureAuthenticated);

athletesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      sexo: Joi.number().required(),
      age: Joi.number().required(),
      body_mass: Joi.number().required(),
      stature: Joi.number().required(),
      aerobic_profile: Joi.number().required(),
      training_level: Joi.number().required(),
      physical_activity: Joi.number().required(),
      objective: Joi.number().required(),
    },
  }),

  athletesController.create,
);
athletesRouter.get('/', athletesController.list);

athletesRouter.patch(
  '/avatar/:athlete_id',
  ensureAuthenticated,
  upload.single('avatar'),
  athleteAvatarController.update,
);

export default athletesRouter;
