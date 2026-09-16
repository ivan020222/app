import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightSensorsService } from './light-sensors.service.js';
import { LightSensorsController } from './light-sensors.controller.js';
import { LightSensor } from './entities/light-sensor.entity.js';
import { LightAlertsService } from './light-alerts.service.js';
@Module({
 imports: [TypeOrmModule.forFeature([LightSensor])],
 controllers: [LightSensorsController],
 providers: [LightSensorsService, LightAlertsService],
})
export class LightSensorsModule {} 