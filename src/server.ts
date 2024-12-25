import mongoose from 'mongoose';
import { app } from './app';
import config from './config';
import { Server } from 'http';

let server: Server;
async function mainServer() {
  try {
    await mongoose.connect(config.MONGODB_URL as string);
    server = app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

mainServer();
// async
process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// synchronous
process.on('uncaughtException', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  process.exit(1);
});
