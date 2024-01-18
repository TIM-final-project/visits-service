import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { plainToInstance } from "class-transformer";
import { ExceptionsDTO } from "./exception.dto";
import { ExceptionService } from "./exception.service";
import { VisitExceptionEntity } from "./exceptions.entity";

@Controller('exceptions')
export class ExceptionController{
    private readonly logger = new Logger(ExceptionController.name);

    constructor(
        private exceptionsService: ExceptionService
    ) {}
    
    @MessagePattern('exceptions_find_all')
    async findAll(visitId?: number): Promise<ExceptionsDTO[]> {
      this.logger.debug('Find all', { visitId });
      const exceptions : VisitExceptionEntity[] = await this.exceptionsService.findAll(visitId);

      return exceptions.map(exception => plainToInstance(ExceptionsDTO, exception));
    }
}