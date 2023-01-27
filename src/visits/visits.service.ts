import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CheckOutVisitDTO } from './dto/checkout-visit.dto';
import { VisitQPs } from './qps/visit.qps';
import { VisitEntity } from './visits.entity';
import { ExceptionEntity } from 'src/exceptions/exceptions.entity';
import { CheckInVisitDTO } from './dto/checkin-visit.dto';
import { CheckInWhere } from './dto/checkin-visit.where';
import { UpdateVisitDTO } from './dto/update-visit.dto';

@Injectable()
export class VisitsService {
  private readonly logger = new Logger(VisitsService.name);

  constructor(
    @InjectRepository(VisitEntity)
    private visitRepository: Repository<VisitEntity>
  ) {}

  findAll(visitQPs?: VisitQPs): Promise<VisitEntity[]> {
    // TODO: change QPs to compare checkin and checkout date.
    // Add QP to to get only todays visit.
    this.logger.debug('findAll QPs:', { ...visitQPs });

    const where: CheckInWhere = {};

    if (!!visitQPs) {
      if (!!visitQPs.driverId) where.driverId = visitQPs.driverId;
      if (!!visitQPs.vehicleId) where.vehicleId = visitQPs.vehicleId;
      if (!!visitQPs.securityId) where.securityId = visitQPs.securityId;

      if (!!visitQPs.before && !!visitQPs.after) {
        where.checkIn = Between(visitQPs.after, visitQPs.before);
      } else if (!!visitQPs.before) {
        where.checkIn = LessThanOrEqual(visitQPs.before);
      } else if (!!visitQPs.after) {
        where.checkIn = MoreThanOrEqual(visitQPs.after);
      } else if (!!visitQPs.checkIn) {
        where.checkIn = visitQPs.checkIn;
      }
      where.active = visitQPs.active;
      this.logger.debug('Where', { where });

      if (!visitQPs.active) {
        delete where.active;
      }
    }

    const query = {
      where: { ...where },
      relations: ['exception']
    };

    this.logger.debug('Query', { query });

    return this.visitRepository.find(query);
  }

  async findOne(id: number, visitQPs?: VisitQPs): Promise<VisitEntity> {
    this.logger.debug('Getting visit', { id, visitQPs });

    // TODO: change QPs to compare checkin and checkout date.
    const visit = await this.visitRepository.findOne(id, {
      where: {
        ...visitQPs,
        active: true
      }
    });
    if (!!visit) {
      return visit;
    } else {
      this.logger.error('Error Getting visit', { id });
      throw new RpcException({
        message: `No existe un visita con el id: ${id}`
      });
    }
  }

  async checkout(id: number, visitDto: CheckOutVisitDTO): Promise<VisitEntity> {
    const visit: VisitEntity = await this.visitRepository.findOne(id);

    if (!visit) {
      this.logger.error('Error creating visit', { id });
      throw new RpcException({
        message: `No existe una visita con el id: ${id}`
      });
    }

    visit.active = false;
    this.visitRepository.merge(visit, visitDto);
    try {
      return await this.visitRepository.save(visit);
    } catch (error) {
      this.logger.error('Error updating visit', { id });
      throw new RpcException({
        message: `Ha ocurrido un error al actualizar la visita: ${id}`
      });
    }
  }

  async create(dto: CheckInVisitDTO): Promise<VisitEntity> {
    const visitVehicle: VisitEntity[] = await this.visitRepository.find({
      where: {
        vehicleId: dto.vehicleId,
        active: true
      }
    });

    if (visitVehicle.length) {
      this.logger.debug(visitVehicle);
      throw new RpcException({
        message: 'El vehiculo ya posee una visita activa',
        status: HttpStatus.FORBIDDEN
      });
    }
    const visitDriver: VisitEntity[] = await this.visitRepository.find({
      where: {
        vehicleId: dto.vehicleId,
        active: true
      }
    });

    if (visitDriver.length) {
      throw new RpcException({
        message: 'El conductor ya posee una visita activa',
        status: HttpStatus.FORBIDDEN
      });
    }

    const visit: VisitEntity = new VisitEntity();

    if (!!dto.exceptionDto) {
      this.logger.log('Visit with exception');
      const exception: ExceptionEntity = new ExceptionEntity();
      exception.managerId = dto.exceptionDto.managerId;
      exception.observations = dto.exceptionDto.observations;
      visit.exception = exception;
    }

    visit.arrival_at = dto.arrivalTime;
    visit.driverId = dto.driverId;
    // visit.securityId = dto.securityId;
    visit.userUUID = dto.userUUID;
    visit.hasSupply = dto.hasSupply;
    visit.vehicleId = dto.vehicleId;
    visit.palletsEntrada = dto.palletsEntrada;
    visit.palletsSalida = dto.palletsSalida;
    visit.destiny = dto.destiny;

    return this.visitRepository.save(visit);
  }

  async update(id: number, dto: UpdateVisitDTO): Promise<VisitEntity> {
    const visit: VisitEntity = await this.visitRepository.findOne(id);

    if (!visit) {
      this.logger.debug(`Visit ${id} not found`);
      throw new RpcException({
        message: 'La visita no existe',
        status: HttpStatus.NOT_FOUND
      });
    }

    this.visitRepository.merge(visit, dto);
    try {
      return await this.visitRepository.save(visit);
    } catch (error) {
      this.logger.error('Error updating visit', { id });
      throw new RpcException({
        message: `Ha ocurrido un error al actualizar la visita: ${id}`
      });
    }
  }
}
