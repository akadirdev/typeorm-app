import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'big_data',
})
export class BigData extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
  })
  fullname?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
  })
  street?: string;

  @property({
    type: 'number',
  })
  postcode?: number;

  constructor(data?: Partial<BigData>) {
    super(data);
  }
}

export interface BigDataRelations {
  // describe navigational properties here
}

export type BigDataWithRelations = BigData & BigDataRelations;
