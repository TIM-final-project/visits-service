import { Controller, Logger } from '@nestjs/common';
import { CheckInVisitDTO } from './dto/checkin-visit.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { VisitDTO } from './dto/visit.dto';
import { CheckOutInterface } from './interfaces/checkout.interface';
import { FindOneHeader } from './interfaces/findone-header.interface';
import { VisitQPs } from './qps/visit.qps';
import { VisitsService } from './visits.service';
import { ExceptionService } from 'src/exceptions/exception.service';
import { UpdateHeader } from './interfaces/update-header.interface';

@Controller('visits')
export class VisitsController {
  private readonly logger = new Logger(VisitsController.name);

  constructor(
    private visitsService: VisitsService,
    private exceptionsService: ExceptionService
  ) {}

  @MessagePattern('visits_find_all')
  async findAll(visitQPs: VisitQPs): Promise<VisitDTO[]> {
    this.logger.debug('Find all', { visitQPs });
    return this.visitsService.findAll(visitQPs);
  }

  @MessagePattern('visits_find_all_entities')
  async findAllEntities(): Promise<VisitDTO[]> {
    this.logger.debug('Find all');
    const visits = await this.visitsService.findAll({ active: true });
    this.logger.debug(visits);
    return visits;
  }

  @MessagePattern('visits_find_one')
  async findOne({ id, visitQPs }: FindOneHeader): Promise<VisitDTO> {
    this.logger.debug('Get Visit by id ', { id, visitQPs });
    return this.visitsService.findOne(id, visitQPs);
  }

  @MessagePattern('visits_create')
  async create(dto: CheckInVisitDTO): Promise<VisitDTO> {
    this.logger.debug('Attempting to create visit for', dto);
    return this.visitsService.create(dto);
  }

  @MessagePattern('visits_update')
  async update({ id, updateDto }: UpdateHeader): Promise<VisitDTO> {
    this.logger.debug('Attempting to create visit for', updateDto);
    return this.visitsService.update(id, updateDto);
  }

  @MessagePattern('visits_resource_exit')
  async resourceExit({
    vehicleId,
    driverId,
    checkOut,
  }: CheckOutInterface): Promise<VisitDTO> {
    this.logger.debug('Resource exiting ', { vehicleId, driverId, checkOut });
    try {
      const checkIns = await this.visitsService.findAll(null);
      if (!checkIns.length) {
        this.logger.error(
          'There are no checkIns from the pair vehicle/driver today.',
          { vehicleId, driverId }
        );
        throw new RpcException({
          message: `No se a encontrado un ingreso previo a la salida`,
        });
      } else if (checkIns.length > 1) {
        this.logger.error(
          'There are more than one checkIns for the pair vehicle/driver today.',
          { vehicleId, driverId }
        );
      }
      const { id } = checkIns[0];
      this.logger.debug('Previous checkIn: ', checkIns[0]);
      return this.visitsService.checkout(id, { id, checkOut });
    } catch (error) {
      this.logger.error('Error CheckingOut visit', {
        vehicleId,
        driverId,
        checkOut,
      });
      throw new RpcException({
        message:
          `Ha ocurrido un error al registrar la salida: ` + error.message,
      });
    }
  }
}
