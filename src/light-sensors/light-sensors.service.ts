import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightSensor } from './entities/light-sensor.entity.js';
import { CreateLightSensorDto } from './dto/create-light-sensor.dto.js';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto.js';
import { LightAlertsService } from './light-alerts.service.js';

@Injectable()
export class LightSensorsService {
  private readonly CRITICAL_LIGHT = 300;
  constructor(
    @InjectRepository(LightSensor)
    private readonly lightSensorRepository: Repository<LightSensor>,
    private readonly alertsService: LightAlertsService,
  ) {}

  async create(createSensorDto: CreateLightSensorDto){
    const record = this.lightSensorRepository.create(createSensorDto);
    const saved = await this.lightSensorRepository.save(record);
    if (saved.value <= this.CRITICAL_LIGHT) {
      this.alertsService.emitAlert({
        message: `Critical light! Value ${saved.value} ${saved.unit}`,
        light: saved.value,
        sensorName: saved.sensorName,
        timestamp: saved.timestamp,
        severity: 'critical',
      });
    }
    return saved;
  }

  async findAll() {
    return await this.lightSensorRepository.find({
      order: { createdAt: 'ASC' },
      take: 50,
    });
  }
  async findOne(id: string) {
    const sensor = await this.lightSensorRepository.findOne({ where: { id } });
    if (!sensor) throw new NotFoundException(`sensor with id ${id} not found`);
    return sensor;
  }
  async update(id: string, updateSensorDto: UpdateLightSensorDto) {
    const sensor = await this.findOne(id);
    Object.assign(sensor, updateSensorDto);
    const saved = await this.lightSensorRepository.save(sensor);
    if (saved.value <= this.CRITICAL_LIGHT) {
      this.alertsService.emitAlert({
        message: `Critical light! Value ${saved.value} ${saved.unit}`,
        light: saved.value,
        sensorName: saved.sensorName,
        timestamp: saved.timestamp,
        severity: 'critical',
      });
    }
    return saved;
  }

  async remove(id: string) {
    const sensor = await this.findOne(id);
    await this.lightSensorRepository.remove(sensor);
  }
} 
