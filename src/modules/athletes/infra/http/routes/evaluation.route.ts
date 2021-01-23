import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EvaluationController from '@modules/athletes/infra/http/controllers/EvaluationController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const evaluationRouter = Router();
const evaluationController = new EvaluationController();

evaluationRouter.use(ensureAuthenticated);

evaluationRouter.get('/:athlete_id', evaluationController.list);
evaluationRouter.post('/', evaluationController.create);

export default evaluationRouter;
