import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(id: number): Promise<VisitEntity> {
    return this.visitRepository.findOne(id);
  }
}
