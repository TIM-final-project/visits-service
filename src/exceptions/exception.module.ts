import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionService } from 'src/exceptions/exception.service';
import { ExceptionController } from './exceptions.controller';
import { ExceptionEntity } from './exceptions.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ExceptionEntity])
    ],
    providers: [ExceptionService],
    controllers: [ExceptionController],
    exports: [ExceptionService]
})
export class ExceptionsModule {}
