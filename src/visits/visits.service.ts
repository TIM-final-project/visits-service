import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitDTO } from './dto/visit.dto';
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
    return this.visitRepository.find({
      where: {
        ...visitQPs,
        active: true
      }
    });
  }

  async findOne(id: number, visitQPs?: VisitQPs): Promise<VisitEntity> {
    this.logger.debug('Getting visit', { id , visitQPs });

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
        message: `No existe un visita con el id: ${id}`,
      });
    }
  }

  create(securityId: number, driverId: number, vehicleId: number): Promise<VisitDTO> {
    const visitVehicle = this.visitRepository.find({
      where: {
        vehicleId: vehicleId,
        active: true,
      }
    });
    if(visitVehicle){
      throw new RpcException({message: "El vehiculo ya posee una visita activa", status: HttpStatus.FORBIDDEN})
    }

    const visitDriver = this.visitRepository.find({
      where: {
        vehicleId: vehicleId,
        active: true,
      }
    });
    if(visitDriver){
      throw new RpcException({message: "El conductor ya posee una visita activa", status: HttpStatus.FORBIDDEN})
    }
    
    return this.visitRepository.save({
      driverId,
      securityId,
      vehicleId,
      checkOut: null
    });
  
  }

}
