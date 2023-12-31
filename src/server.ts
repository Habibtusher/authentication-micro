import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';
import { RedisClient } from './shared/redis';

let server: Server;
process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});

async function main() {
  try {
    await RedisClient.connect()
    await mongoose.connect(config.database_url as string);

    console.log('db connected');
    server = app.listen(config.port, () => {
      console.log(`Authentication app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('faield to connect');
  }
  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        console.log(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();
process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
