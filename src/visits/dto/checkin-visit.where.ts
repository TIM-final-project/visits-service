import { FindOperator } from 'typeorm';

export class CheckInWhere {
  driverId?: number;
  vehicleId?: number;
  securityId?: number;
  checkIn?: Date | FindOperator<any>;
  active?: boolean;
  plant?: number;
}
