import express, { Express } from 'express';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Task } from './src/Tasks/tasks.entity';
import { tasksRouter } from './src/Tasks/tasks.router';

const app: Express = express();
const port = process.env.PORT;


app.use(bodyParser.json());

app.use(cors());
export const AppDataSource =
  new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Task],
    synchronize: true
  });


AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    console.log('Data source has been initialized');
  })
  .catch((err) => {
    console.error('Error During Data Source Initialization', err);
  });

app.use('/', tasksRouter);



