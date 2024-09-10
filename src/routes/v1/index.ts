import express, { Router } from 'express';
import authRoute from './auth.route';
import docsRoute from './swagger.route';
import studentRoute from './student.route';
import lecturerRoute from './lecturer.route';
import config from '../../config/config';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

// Restructure the routing
const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/lecturers',
    route: lecturerRoute,
  },
  {
    path: '/fas',
    route: lecturerRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
