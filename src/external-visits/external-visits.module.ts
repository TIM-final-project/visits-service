import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalVisitsController } from './external-visits.controller';
import ExternalVisitEntity from './external-visits.entity';
import { ExternalVisitsService } from './external-visits.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalVisitEntity])],
  controllers: [ExternalVisitsController],
  providers: [ExternalVisitsService]
})
export class ExternalVisitsModule {}
