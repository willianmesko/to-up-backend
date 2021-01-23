import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AthleteSignUpController from '@modules/athletes/infra/http/controllers/AthleteSignUpController';


const athleteSignUpRouter = Router();
const athleteSignUpController = new AthleteSignUpController();



athleteSignUpRouter.post('/signup', athleteSignUpController.create);


export default athleteSignUpRouter;
