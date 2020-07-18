import { Router } from 'express';

import EvaluationController from '@modules/athletes/infra/http/controllers/EvaluationController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const evaluationRouter = Router();
const evaluationController = new EvaluationController();

evaluationRouter.use(ensureAuthenticated);

evaluationRouter.post('/', evaluationController.create);
evaluationRouter.get('/:athlete_id', evaluationController.list);

export default evaluationRouter;
