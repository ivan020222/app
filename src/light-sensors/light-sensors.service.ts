import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightSensor } from './entities/light-sensor.entity.js';
import { CreateLightSensorDto } from './dto/create-light-sensor.dto.js';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto.js';

@Injectable()
export class LightSensorsService {
  constructor(
    @InjectRepository(LightSensor)
    private readonly lightSensorRepository: Repository<LightSensor>,
  ) {}

  async create(createSensorDto: CreateLightSensorDto){
    const record = this.lightSensorRepository.create(createSensorDto);
    return await this.lightSensorRepository.save(record);
  }

  async findAll() {
    return await this.lightSensorRepository.find({
      order: { createdAt: 'DESC' },
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
    return await this.lightSensorRepository.save(sensor);
  }

  async remove(id: string) {
    const sensor = await this.findOne(id);
    await this.lightSensorRepository.remove(sensor);
  }
} 
