import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository
} from 'typeorm';
import { CreateDTO } from './dto/crete.dto';
import { QPsDTO } from './dto/qps.dto';
import { UpdateDTO } from './dto/update.dto';
import ExternalVisitEntity from './external-visits.entity';
import { omit } from 'lodash';

@Injectable()
export class ExternalVisitsService {
  private readonly logger = new Logger(ExternalVisitsService.name);

  constructor(
    @InjectRepository(ExternalVisitEntity)
    private externalVisitRepository: Repository<ExternalVisitEntity>
  ) {}

  findAll(params: QPsDTO): Promise<ExternalVisitEntity[]> {
    this.logger.debug('Query', { params });
    const options: FindManyOptions = {
      where: { ...omit(params, ['before', 'after']) }
    };

    if (!!params.before && !!params.after) {
      options.where.scheduledDate = Between(params.after, params.before);
    } else if (!!params.before) {
      options.where.scheduledDate = LessThanOrEqual(params.before);
    } else if (!!params.after) {
      options.where.scheduledDate = MoreThanOrEqual(params.after);
    }

    this.logger.debug(options);
    return this.externalVisitRepository.find(options);
  }

  async findOne(id: number): Promise<ExternalVisitEntity> {
    this.logger.debug('Id', { id });
    const visit = await this.externalVisitRepository.findOne(id);
    if (visit) {
      return visit;
    } else {
      this.logger.error('No visit with requested id', { id });
      throw new RpcException({
        message: 'No se ha encontrado la visita en cuestion',
        status: HttpStatus.INTERNAL_SERVER_ERROR
      });
    }
  }

  create(create: CreateDTO): Promise<ExternalVisitEntity> {
    try {
      return this.externalVisitRepository.save(create);
    } catch (error) {
      this.logger.error('Error creating external visit', { error });
      throw new RpcException({
        message: 'Ha ocurrido un error al agendar la visita',
        status: HttpStatus.INTERNAL_SERVER_ERROR
      });
    }
  }

  async update({ id, ...rest }: UpdateDTO): Promise<ExternalVisitEntity> {
    this.logger.debug('Updating visit', { id, ...rest });
    try {
      const visit = await this.externalVisitRepository.findOne(id);
      if (!visit) {
        this.logger.debug(
          `External Visit ${id} does not exists in the DataBase.`
        );
        throw new RpcException({
          message: 'La visita soliciada no existe.',
          status: HttpStatus.NOT_FOUND
        });
      }
      this.externalVisitRepository.merge(visit, { ...rest });
      return this.externalVisitRepository.save(visit);
    } catch (error) {
      this.logger.error('Error creating external visit', { error });
      throw new RpcException({
        message: 'Ha ocurrido un error al actualizar la visita',
        status: HttpStatus.INTERNAL_SERVER_ERROR
      });
    }
  }
}
