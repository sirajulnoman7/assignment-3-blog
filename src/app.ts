import express from 'express';
import cors from 'cors';

// import router from './Modules/Routers';
import notFound from './Modules/GlobalMiddleware/notFound';
import globalErrorHandler from './Modules/GlobalMiddleware/globalErrorHandler';
import authRoute from './Modules/Auth/auth.routes';
import blogRoute from './Modules/Blogs/blog.route';
import userRoute from './Modules/Users/user.routes';
import adminRoutes from './Modules/Admin/admin.routes';

export const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello assignment 3 running on the prot 5000!');
});
// app.use('/api', router);
app.use('/api/auth', authRoute);
app.use('/api', blogRoute);
app.use('/api', userRoute);
app.use('/api', adminRoutes);

app.use(globalErrorHandler);

app.use(notFound);
