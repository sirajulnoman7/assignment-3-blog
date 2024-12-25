import { Router } from 'express';
import blogRoute from '../Blogs/blog.route';
import authRoute from '../Auth/auth.routes';
import userRoute from '../Users/user.routes';
import adminRoutes from '../Admin/admin.routes';

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
  {
    path: '/admin',
    route: adminRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
