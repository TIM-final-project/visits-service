import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitsController } from './visits.controller';
import { VisitEntity } from './visits.entity';
import { VisitsService } from './visits.service';

@Module({
  imports: [TypeOrmModule.forFeature([VisitEntity])],
  providers: [VisitsService],
  controllers: [VisitsController]
})
export class VisitsModule {}
