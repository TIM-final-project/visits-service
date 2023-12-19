import { ExceptionsDTO } from 'src/exceptions/exception.dto';

export class CheckInVisitDTO {
  vehicleId: number;
  driverId: number;
  userUUID: string;
  arrivalTime: Date;
  palletsEntrada: number;
  palletsSalida: number;
  destiny: string;
  hasSupply: boolean;
  exceptionDto?: ExceptionsDTO;
}
