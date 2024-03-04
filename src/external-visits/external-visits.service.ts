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
import { CreateExternalVisitDTO } from './dto/crete.dto';
import { QPsExternalIntegrationDTO } from './dto/qps.dto';
import ExternalVisitEntity from './external-visits.entity';
import { omit } from 'lodash';
import { UpdateExternalVisitDTO } from './dto/update.dto';
import { ResponseExternalVisitDTO } from './dto/response.dto';
import { scheduled } from 'rxjs';

@Injectable()
export class ExternalVisitsService {
  private readonly logger = new Logger(ExternalVisitsService.name);

  constructor(
    @InjectRepository(ExternalVisitEntity)
    private externalVisitRepository: Repository<ExternalVisitEntity>
  ) {}

  findAll(params: QPsExternalIntegrationDTO): Promise<ExternalVisitEntity[]> {
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

  async findOne(id: number): Promise<ResponseExternalVisitDTO> {
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

  async create(create: CreateExternalVisitDTO): Promise<ExternalVisitEntity[]> {
    try {
      const scheduledDates: Date[] = create.scheduledDate;

      let externalVisits: ExternalVisitEntity[] = new Array()
      for (const date of scheduledDates) {
        const { scheduledDate, ...externalVisit} = create;
        const savedExternalVisit: ExternalVisitEntity = await this.externalVisitRepository.save({...externalVisit, scheduledDate: date})
        externalVisits.push(savedExternalVisit);
      }

      return externalVisits;
    } catch (error) {
      this.logger.error('Error creating external visit', { error });
      throw new RpcException({
        message: 'Ha ocurrido un error al agendar la visita',
        status: HttpStatus.INTERNAL_SERVER_ERROR
      });
    }
  }

  async update({ id, body }): Promise<ExternalVisitEntity> {
    this.logger.debug('Updating visit', { id, body });
    try {
      const visit = await this.externalVisitRepository.findOne(id);
      if (!visit) {
        this.logger.debug(
          `External Visit ${id} does not exists in the DataBase.`
        );
        throw new RpcException({
          message: 'La visita solicitada no existe.',
          status: HttpStatus.NOT_FOUND
        });
      }
      if(!!body.scheduledDate && body.scheduledDate.lenght > 0){
        body.scheduledDate = body.scheduledDate[0]
      }
      this.externalVisitRepository.merge(visit, body);
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
