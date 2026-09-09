import { PartialType } from '@nestjs/mapped-types';
import { CreateLightSensorDto } from './create-light-sensor.dto.js';

export class UpdateLightSensorDto extends PartialType(CreateLightSensorDto) {}