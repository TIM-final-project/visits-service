export class CreateExternalVisitDTO {
  name: string;
  surname: string;
  cuit: string;
  scheduledDate: Date[];
  arrivalDate?: Date;
  exitDate?: Date;
  company?: string;
  has_vehicle?: boolean;
  checkin_form?: boolean;
  vehiclePlate?: string;
  userUUID: string;
  tasks?: string;
  observations?: string;
  isContractor?: boolean;
  plant:number;
}
