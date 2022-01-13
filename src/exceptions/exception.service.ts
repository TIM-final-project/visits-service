import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExceptionEntity } from "./exceptions.entity";

@Injectable()
export class ExceptionService {
  private readonly logger = new Logger(ExceptionService.name);

  constructor(
    @InjectRepository(ExceptionEntity)
    private exceptionsRepository: Repository<ExceptionEntity>
  ) {}

  async create(visitId: number, managerId: number, observations: string){
    
    return this.exceptionsRepository.save({visitId, managerId, observations});
  }
}