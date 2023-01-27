export class ResponseDTO {
  name: string;
  surname: string;
  cuit: string;
  scheduledDate: Date;
  vehiclePlate?: string;
  active?: boolean;
  arrivalDate?: Date;
  exitDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  managerUuid: string;
}
