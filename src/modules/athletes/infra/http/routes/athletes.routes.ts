import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import AthletesController from '@modules/athletes/infra/http/controllers/AthletesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const athletesRouter = Router();
const athletesController = new AthletesController();
const upload = multer(uploadConfig.multer);

athletesRouter.use(ensureAuthenticated);

athletesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      sexo: Joi.boolean().required(),
      age: Joi.number().required(),
      body_mass: Joi.number().required(),
      stature: Joi.number().required(),
      aerobic_profile: Joi.number().required(),
      training_level: Joi.number().required(),
      physical_activity: Joi.number().required(),
      objective: Joi.number().required(),
      basal_metabolic_rate: Joi.number().required(),
      spent_daily_train: Joi.number().required(),
      mass_muscle: Joi.number().required(),
      mass_fat: Joi.number().required(),
      imc: Joi.number().required(),
      personal_profile: Joi.number().required(),
    },
  }),

  athletesController.create,
);
athletesRouter.get('/', athletesController.list);

export default athletesRouter;
