import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CheckInVisitDTO } from './dto/checkin-visit.dto';
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
  findOne({id, visitQPs}: Header): Promise<VisitDTO> {
    this.logger.debug('Get Visit by id ', { id, visitQPs });
    return this.visitsService.findOne(id, visitQPs);
  }

  @MessagePattern('visit_create')
  async create(dto: CheckInVisitDTO): Promise<VisitDTO> {
    this.logger.debug('Attempting to create visit for', dto);
    return this.visitsService.create(dto.securityId, dto.driverId, dto.vehicleId);
  }

}
