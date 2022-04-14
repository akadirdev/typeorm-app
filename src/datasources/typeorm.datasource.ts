import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {BigDataType} from '../models/big-data.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: false,
  entities: [BigDataType],
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log('typeorm datasource init');
  })
  .catch(error => console.log(error));
