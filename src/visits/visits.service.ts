import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { checkOutVisitDTO } from './dto/checkout-visit.dto';
import { VisitQPs } from './qps/visit.qps';
import { VisitEntity } from './visits.entity';

@Injectable()
export class VisitsService {
  private readonly logger = new Logger(VisitsService.name);

  constructor(
    @InjectRepository(VisitEntity)
    private visitRepository: Repository<VisitEntity>
  ) {}

  findAll(visitQPs: VisitQPs): Promise<VisitEntity[]> {
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

  getCheckOut(
    vehicleId: number,
    driverId: number,
    checkOut: Date
  ): Promise<VisitEntity[]> {
    this.logger.debug('Getting checkout', { vehicleId, driverId, checkOut });
    const beginingOfDay: Date = new Date(checkOut);
    beginingOfDay.setHours(0, 0, 0);
    const where = {
      vehicleId,
      driverId,
      checkIn: Between(beginingOfDay, checkOut),
      checkOut: null
    };

    this.logger.debug('DB Query Where', { where });

    return this.visitRepository.find({ where });
  }

  async update(id: number, visitDto: checkOutVisitDTO): Promise<VisitEntity> {
    const visit: VisitEntity = await this.visitRepository.findOne(id);

    if (visit) {
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
}
