import { Module } from '@nestjs/common';
import { LightSensorsService } from './light-sensors.service.js';
import { LightSensorsController } from './light-sensors.controller.js';

@Module({
  controllers: [LightSensorsController],
  providers: [LightSensorsService],
})
export class LightSensorsModule {}