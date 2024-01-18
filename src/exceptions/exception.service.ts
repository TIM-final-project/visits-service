import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VisitEntity } from "src/visits/visits.entity";
import { Repository } from "typeorm";
import { VisitExceptionEntity } from "./exceptions.entity";

@Injectable()
export class ExceptionService {

  private readonly logger = new Logger(ExceptionService.name);

  constructor(
    @InjectRepository(VisitExceptionEntity)
    private exceptionsRepository: Repository<VisitExceptionEntity>
  ) {}
  
  findAll(visitId?: number): Promise<VisitExceptionEntity[]> {
    return this.exceptionsRepository.find({
      where: {
        visitId
      }
    })
  }

  async create(visit: VisitEntity, managerId: number, observations: string){
    return this.exceptionsRepository.save({visit, managerId, observations});
  }
}