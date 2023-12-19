import { PartialType } from '@nestjs/swagger';
import { CreateExternalVisitDTO } from './crete.dto';

export class UpdateExternalVisitDTO extends PartialType(
  CreateExternalVisitDTO
) {}
