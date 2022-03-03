import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsModule } from 'src/exceptions/exception.module';
import { VisitsController } from './visits.controller';
import { VisitEntity } from './visits.entity';
import { VisitsService } from './visits.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([VisitEntity]),
        ExceptionsModule
    ],
    providers: [VisitsService],
    controllers:[VisitsController]
})
export class VisitsModule {}
