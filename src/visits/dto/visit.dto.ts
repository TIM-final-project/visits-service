import { Timestamp } from 'typeorm';
import { ExceptionsDTO } from '../../exceptions/exception.dto';
import { VisitExceptionEntity } from '../../exceptions/exceptions.entity';

export class VisitDTO {
  id: number;

  vehicleId: number;

  driverId: number;

  userUUID: string;

  checkIn: Timestamp;

  checkOut?: Timestamp;

  created_at: Date;

  updated_at: Date;

  arrival_at: Date;

  palletsEntrada?: number;

  palletsSalida?: number;

  destiny?: string;

  active: boolean;

  hasSupply?: boolean;

  exception: ExceptionsDTO;

  plant: number;
}
