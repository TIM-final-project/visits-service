import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateExternalVisitDTO } from './dto/crete.dto';
import { QPsExternalIntegrationDTO } from './dto/qps.dto';
import { ResponseExternalVisitDTO } from './dto/response.dto';
import { UpdateExternalVisitDTO } from './dto/update.dto';
import { ExternalVisitsService } from './external-visits.service';
import { UpdateExternalVisitHeader } from './interfaces/update-externa-visit-header.interface';

@Controller('external-visits')
export class ExternalVisitsController {
  private readonly logger = new Logger(ExternalVisitsController.name);

  constructor(private externalVisitsService: ExternalVisitsService) {}

  @MessagePattern('external_visits_find_all')
  async findAll(
    params: QPsExternalIntegrationDTO
  ): Promise<ResponseExternalVisitDTO[]> {
    this.logger.debug('Find all', { params });
    return this.externalVisitsService.findAll(params);
  }

  @MessagePattern('external_visits_find_one')
  async findOne({ id }): Promise<ResponseExternalVisitDTO> {
    this.logger.debug('Find by id', { id });
    return this.externalVisitsService.findOne(id);
  }

  @MessagePattern('external_visits_create')
  async create(
    create: CreateExternalVisitDTO
  ): Promise<ResponseExternalVisitDTO> {
    this.logger.debug('Creating external visit', { create });
    return this.externalVisitsService.create(create);
  }

  @MessagePattern('external_visits_update')
  async update({ id, updateDto }: UpdateExternalVisitHeader): Promise<ResponseExternalVisitDTO> {
    this.logger.debug('Updating external visit', { updateDto });
    return this.externalVisitsService.update({ id, body: updateDto });
  }
}
