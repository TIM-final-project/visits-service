import { PartialType, OmitType } from '@nestjs/swagger';
import { CheckInVisitDTO } from './checkin-visit.dto';

export class UpdateVisitDTO extends PartialType(
  OmitType(CheckInVisitDTO, [
    'vehicleId',
    'driverId',
    'userUUID',
    'arrivalTime',
    'plant'
  ] as const)
) {}
