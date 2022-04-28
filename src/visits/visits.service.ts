import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitDTO } from './dto/visit.dto';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { checkOutVisitDTO } from './dto/checkout-visit.dto';
import { VisitQPs } from './qps/visit.qps';
import { VisitEntity } from './visits.entity';
import { ActiveVisitsQuery } from './interfaces/active-visits.query';
import { ExceptionsDTO } from 'src/exceptions/exception.dto';
import { ExceptionEntity } from 'src/exceptions/exceptions.entity';

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
    return this.visitRepository.find({
      where: {
        ...visitQPs,
        active: true
      }
    });
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

  async update(id: number, visitDto: checkOutVisitDTO): Promise<VisitEntity> {
    const visit: VisitEntity = await this.visitRepository.findOne(id);

    if (visit) {
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
    } else {
      this.logger.error('Error creating visit', { id });
      throw new RpcException({
        message: `No existe una visita con el id: ${id}`
      });
    }
  }

  async create(
    securityId: number,
    driverId: number,
    vehicleId: number,
    arrival_at: Date,
    exceptionDto?: ExceptionsDTO
  ): Promise<VisitEntity> {
    const visitVehicle: VisitEntity[] = await this.visitRepository.find({
      where: {
        vehicleId: vehicleId,
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
        vehicleId: vehicleId,
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

    if(!!exceptionDto){
      this.logger.log("Visit with exception");
      const exception: ExceptionEntity = new ExceptionEntity();
      exception.managerId = exceptionDto.managerId;
      exception.observations = exceptionDto.observations;
      visit.exception = exception;
    }

    visit.arrival_at = arrival_at;
    visit.driverId = driverId;
    visit.securityId = securityId;
    visit.vehicleId = securityId;

    return this.visitRepository.save(visit);
  }
}
