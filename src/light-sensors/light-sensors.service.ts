import { Injectable, NotFoundException } from '@nestjs/common';
import { LightSensor } from './entities/light-sensor.entity.js';
import { CreateLightSensorDto } from './dto/create-light-sensor.dto.js';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LightSensorsService {
  private sensors: LightSensor[] = [];

  create(createSensorDto: CreateLightSensorDto): LightSensor {
    const sensor: LightSensor = {
      ...createSensorDto,
      id: uuidv4(),
      timestamp: new Date(),
    };
    this.sensors.push(sensor);
    return sensor;
  }

  findAll() {
    return this.sensors;
  }

  findOne(id: string) {
    const sensor = this.sensors.find((s) => s.id === id);
    if (!sensor) throw new NotFoundException(`sensor with id ${id} not found`);
    return sensor;
  }

  update(
    id: string,
    updateSensorDto: UpdateLightSensorDto,
  ): LightSensor {
    const sensor = this.findOne(id);
    Object.assign(sensor, updateSensorDto);
    return sensor;
  }

  remove(id: string): void {
    const sensor = this.findOne(id);
    this.sensors = this.sensors.filter((s) => s.id !== sensor.id);
  }
}