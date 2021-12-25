import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { VisitDTO } from './dto/visit.dto';
import { Header } from './interfaces/header.interface';
import { VisitQPs } from './qps/visit.qps';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {
  private readonly logger = new Logger(VisitsController.name);

  constructor(private visitsService: VisitsService) {}

  @MessagePattern('visits_find_all')
  async findAll(
    visitQPs: VisitQPs
  ): Promise<VisitDTO[]> {
    this.logger.debug('Find all', { visitQPs });
    return this.visitsService.findAll(visitQPs);
  }

  @MessagePattern('visits_find_one')
  async findOne({id, visitQPs}: Header): Promise<VisitDTO> {
    this.logger.debug('Get Visit by id ', { id, visitQPs });
    return await this.visitsService.findOne(id, visitQPs);
  }


  @MessagePattern('resource_exit')
  async resourceExit(
    vehicleId: number,
    driverId: number,
    checkOut: Date
  ): Promise<VisitDTO> {
    this.logger.debug('Resource exiting ', { vehicleId, driverId, checkOut });
    try {
      const { id } = await this.visitsService.findAll({
        vehicleId,
        driverId,
        checkOut
      })
      return this.visitsService.update(id, { vehicleId, driverId, checkOut });
    } catch (error) {
      this.logger.error('Error CheckingOu visit', {
        vehicleId,
        driverId,
        checkOut,
      });
      throw new RpcException({
        message: `Ha ocurrido un error al realizar sa salida`,
      });
    }
  }
}
