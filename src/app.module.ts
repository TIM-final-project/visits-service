import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config';
import { ExceptionsModule } from './exceptions/exception.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useClass: TypeOrmConfigService
    }),
    VisitsModule,
    ExceptionsModule
  ],
})
export class AppModule {}
