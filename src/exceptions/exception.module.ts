import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionService } from 'src/exceptions/exception.service';
import { ExceptionEntity } from './exceptions.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ExceptionEntity])
    ],
    providers: [ExceptionService],
    exports: [ExceptionService]
})
export class ExceptionsModule {}
