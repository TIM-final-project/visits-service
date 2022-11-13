import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateDTO } from './dto/crete.dto';
import { QPsDTO } from './dto/qps.dto';
import { ResponseDTO } from './dto/response.dto';
import { UpdateDTO } from './dto/update.dto';
import { ExternalVisitsService } from './external-visits.service';

@Controller('external-visits')
export class ExternalVisitsController {
  private readonly logger = new Logger(ExternalVisitsController.name);

  constructor(private externalVisitsService: ExternalVisitsService) {}

  @MessagePattern('external_visits_find_all')
  async findAll(params: QPsDTO): Promise<ResponseDTO[]> {
    this.logger.debug('Find all', { params });
    return this.externalVisitsService.findAll(params);
  }

  @MessagePattern('external_visits_find_one')
  async findOne(id: number): Promise<ResponseDTO> {
    this.logger.debug('Find by id', { id });
    return this.externalVisitsService.findOne(id);
  }

  @MessagePattern('external_visits_create')
  async create(create: CreateDTO): Promise<ResponseDTO> {
    this.logger.debug('Creating external visit', { create });
    return this.externalVisitsService.create(create);
  }

  @MessagePattern('external_visits_update')
  async update(update: UpdateDTO): Promise<ResponseDTO> {
    this.logger.debug('Updateing external visit', { update });
    return this.externalVisitsService.update(update);
  }
}
