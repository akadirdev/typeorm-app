import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgDataSource} from '../datasources';
import {BigData, BigDataRelations} from '../models';

export class BigDataRepository extends DefaultCrudRepository<
  BigData,
  typeof BigData.prototype.id,
  BigDataRelations
> {
  constructor(@inject('datasources.pg') dataSource: PgDataSource) {
    super(BigData, dataSource);
  }
}
