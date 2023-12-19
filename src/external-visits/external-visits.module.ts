import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsModule } from 'src/exceptions/exception.module';
import { ExternalVisitsController } from './external-visits.controller';
import ExternalVisitEntity from './external-visits.entity';
import { ExternalVisitsService } from './external-visits.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalVisitEntity]), ExceptionsModule],
  controllers: [ExternalVisitsController],
  providers: [ExternalVisitsService]
})
export class ExternalVisitsModule {}
