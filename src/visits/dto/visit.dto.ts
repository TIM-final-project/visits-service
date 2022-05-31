import { Timestamp } from 'typeorm';
import { ExceptionsDTO } from '../../exceptions/exception.dto';
import { ExceptionEntity } from '../../exceptions/exceptions.entity';

export class VisitDTO {
  id: number;

  vehicleId: number;

  driverId: number;

  securityId: number;

  checkIn: Timestamp;

  checkOut?: Timestamp;

  created_at: Date;

  updated_at: Date;

  arrival_at: Date;

  palletsEntrada?: number;

  palletsSalida?: number;

  destiny?: string;

  active: boolean;

  exception: ExceptionsDTO;
}
