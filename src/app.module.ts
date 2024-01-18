import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config';
import { VisitsModule } from './visits/visits.module';
import { ExternalVisitsModule } from './external-visits/external-visits.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useClass: TypeOrmConfigService
    }),
    VisitsModule,
    ExternalVisitsModule
  ]
})
export class AppModule {}
