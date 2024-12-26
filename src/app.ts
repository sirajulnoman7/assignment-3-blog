import express from 'express';
import cors from 'cors';

import router from './Modules/Routers';
import notFound from './Modules/GlobalMiddleware/notFound';
import globalErrorHandler from './Modules/GlobalMiddleware/globalErrorHandler';

export const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello assignment 3 running on the prot 5000!');
});
app.use('/api', router);

app.use(globalErrorHandler);

app.use(notFound);
