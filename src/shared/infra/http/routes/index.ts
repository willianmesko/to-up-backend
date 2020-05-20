import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import athleteRouter from '@modules/athletes/infra/http/routes/athletes.routes';
import trainingRouter from '@modules/training/infra/http/routes/training.routes';
import routinesRouter from '@modules/training/infra/http/routes/routines.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/athletes', athleteRouter);
routes.use('/training', trainingRouter);
routes.use('/routines', routinesRouter);
export default routes;
