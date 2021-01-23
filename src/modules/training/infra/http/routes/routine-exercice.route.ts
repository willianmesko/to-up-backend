import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RoutineExerciceController from '@modules/training/infra/http/controllers/RoutineExerciceController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routineExerciceRouter = Router();
const routineExerciceController = new RoutineExerciceController();

routineExerciceRouter.use(ensureAuthenticated);


routineExerciceRouter.post('/', routineExerciceController.create);
routineExerciceRouter.put('/', routineExerciceController.edit);
routineExerciceRouter.delete('/:exercice_id', routineExerciceController.delete);

export default routineExerciceRouter;
