import { Router } from 'express';
import blogRoute from '../Blogs/blog.route';
import authRoute from '../Auth/auth.routes';
import userRoute from '../Users/user.routes';

const router = Router();

const moduleRoute = [
  {
    path: '/',
    route: blogRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/',
    route: userRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
