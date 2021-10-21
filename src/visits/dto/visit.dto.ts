import { Timestamp } from "typeorm";

export class VisitDTO {
  id: number;
  vehicleId?: number;
  driverId?: number;
  securityId?: number;
  checkIn: Date;
  checkOut?: Date;
}