import { FindOperator } from 'typeorm';

export class ActiveVisitsQuery {
  driverId?: number;
  vehicleId?: number;
  checkIn?: Date | FindOperator<Date>;
  checkOut?: Date;
}
