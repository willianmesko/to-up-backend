import { Router } from 'express';




import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import usersRouter from '@modules/users/infra/http/routes/users.route';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';


import atheleteRouter from '@modules/athletes/infra/http/routes/athlete.route';
import athleteWorkoutRouter from '@modules/athletes/infra/http/routes/athlete-workout.route';
import athleteSignUpRouter from '@modules/athletes/infra/http/routes/athlete-signup.route';
import atheleteAvatarRouter from '@modules/athletes/infra/http/routes/athlete-avatar.route';

import evaluationRouter from '@modules/athletes/infra/http/routes/evaluation.route';


import trainingRouter from '@modules/training/infra/http/routes/training.route';
import trainingAthleteRouter from '@modules/training/infra/http/routes/training-athletes.route';
import trainingDuplicateRouter from '@modules/training/infra/http/routes/training-duplicate.route';
import routinesRouter from '@modules/training/infra/http/routes/routines.route';
import routineExerciceRouter from '@modules/training/infra/http/routes/routine-exercice.route';
import exercicesRouter from '@modules/training/infra/http/routes/exercice.route'

const routes = Router();


routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/athletes', atheleteRouter);
routes.use('/athletes', athleteWorkoutRouter);
routes.use('/athletes', athleteSignUpRouter);
routes.use('/athletes', atheleteAvatarRouter);
routes.use('/evaluation', evaluationRouter);


routes.use('/training', trainingRouter);
routes.use('/training', trainingAthleteRouter);
routes.use('/training', trainingDuplicateRouter);
routes.use('/routines', routinesRouter);
routes.use('/routine_exercice', routineExerciceRouter);
routes.use('/exercices', exercicesRouter);


export default routes;
