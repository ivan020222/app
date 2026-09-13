import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureSensor } from './entities/temperature-sensor.entity.js';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto.js';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto.js';

@Injectable()
export class TemperatureSensorsService {
  constructor(
    @InjectRepository(TemperatureSensor)
    private readonly temperatureSensorRepository: Repository<TemperatureSensor>,
  ) {}

  async create(createSensorDto: CreateTemperatureSensorDto){
    const record = this.temperatureSensorRepository.create(createSensorDto);
    return await this.temperatureSensorRepository.save(record);
  }

  async findAll() {
    return await this.temperatureSensorRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }
  async findOne(id: string) {
    const sensor = await this.temperatureSensorRepository.findOne({ where: { id } });
    if (!sensor) throw new NotFoundException(`sensor with id ${id} not found`);
    return sensor;
  }
  async update(id: string, updateSensorDto: UpdateTemperatureSensorDto) {
    const sensor = await this.findOne(id);
    Object.assign(sensor, updateSensorDto);
    return await this.temperatureSensorRepository.save(sensor);
  }

  async remove(id: string) {
    const sensor = await this.findOne(id);
    await this.temperatureSensorRepository.remove(sensor);
  }
} 
