import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import 'reflect-metadata';
import {AppDataSource} from '../datasources/typeorm.datasource';
import {BigData, BigDataType} from '../models';
import {BigDataRepository} from '../repositories';

export class BigDataController {
  constructor(
    @repository(BigDataRepository)
    public bigDataRepository: BigDataRepository,
  ) {}

  @post('/big-data/{lenght}')
  @response(200, {
    description: 'BigData model instance',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BigData),
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BigData, {
            title: 'NewBigData',
            exclude: ['id'],
          }),
        },
      },
    })
    bigData: Omit<BigData, 'id'>,
    @param.path.number('lenght') lenght: number,
  ): Promise<BigData[]> {
    const bigDataTypeormRepository = AppDataSource.getRepository(BigDataType);

    const newDatas = [] as BigData[];
    const newDatasType = [] as BigDataType[];
    console.log('len: ', lenght);

    for (let i = 0; i < lenght; i++) {
      newDatas.push(bigData);
      const yeni = new BigDataType({
        name: bigData.name,
        surname: bigData.surname,
        fullname: bigData.fullname,
        email: bigData.email,
        phone: bigData.phone,
        city: bigData.city,
        street: bigData.street,
        postcode: bigData.postcode,
      });
      newDatasType.push(yeni);
    }

    console.time('Loopback built-in repository.createAll');
    const datas = await this.bigDataRepository.createAll(newDatas);
    console.timeEnd('Loopback built-in repository.createAll');

    console.time('TypeORM repository.save');
    await bigDataTypeormRepository.save(newDatasType, {chunk: 30});
    console.timeEnd('TypeORM repository.save');

    return datas;
  }

  @get('/big-data/count')
  @response(200, {
    description: 'BigData model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(BigData) where?: Where<BigData>): Promise<Count> {
    return this.bigDataRepository.count(where);
  }

  @get('/big-data')
  @response(200, {
    description: 'Array of BigData model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BigData, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BigData) filter?: Filter<BigData>,
  ): Promise<BigData[]> {
    return this.bigDataRepository.find(filter);
  }

  @patch('/big-data')
  @response(200, {
    description: 'BigData PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BigData, {partial: true}),
        },
      },
    })
    bigData: BigData,
    @param.where(BigData) where?: Where<BigData>,
  ): Promise<Count> {
    return this.bigDataRepository.updateAll(bigData, where);
  }

  @get('/big-data/{id}')
  @response(200, {
    description: 'BigData model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BigData, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BigData, {exclude: 'where'})
    filter?: FilterExcludingWhere<BigData>,
  ): Promise<BigData> {
    return this.bigDataRepository.findById(id, filter);
  }

  @patch('/big-data/{id}')
  @response(204, {
    description: 'BigData PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BigData, {partial: true}),
        },
      },
    })
    bigData: BigData,
  ): Promise<void> {
    await this.bigDataRepository.updateById(id, bigData);
  }

  @put('/big-data/{id}')
  @response(204, {
    description: 'BigData PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bigData: BigData,
  ): Promise<void> {
    await this.bigDataRepository.replaceById(id, bigData);
  }

  @del('/big-data/{id}')
  @response(204, {
    description: 'BigData DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bigDataRepository.deleteById(id);
  }
}
