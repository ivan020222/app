import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightSensorsService } from './light-sensors.service.js';
import { LightSensorsController } from './light-sensors.controller.js';
import { LightSensor } from './entities/light-sensor.entity.js';
@Module({
 imports: [TypeOrmModule.forFeature([LightSensor])],
 controllers: [LightSensorsController],
 providers: [LightSensorsService],
})
export class LightSensorsModule {} 