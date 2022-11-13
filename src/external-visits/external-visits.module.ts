import { Module } from '@nestjs/common';
import { ExternalVisitsController } from './external-visits.controller';
import { ExternalVisitsService } from './external-visits.service';

@Module({
  controllers: [ExternalVisitsController],
  providers: [ExternalVisitsService]
})
export class ExternalVisitsModule {}
