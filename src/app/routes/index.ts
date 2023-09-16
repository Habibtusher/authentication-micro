import express from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];
moduleRoutes.map(route => {
    router.use(route.path, route.route);
  });

export default router;
