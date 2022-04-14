import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
  name: 'big_data',
})
export class BigDataType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  fullname?: string;

  @Column()
  email: string;

  @Column()
  phone?: string;

  @Column()
  city: string;

  @Column()
  street?: string;

  @Column()
  postcode?: number;

  constructor(data?: Partial<BigDataType>) {
    super();
    Object.assign(this, data);
  }
}
