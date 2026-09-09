import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LightSensorsService } from './light-sensors.service.js';
import { CreateLightSensorDto } from './dto/create-light-sensor.dto.js';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto.js';

@Controller('light-sensors')
export class LightSensorsController {
  constructor(private readonly sensorsService: LightSensorsService) {}

  @Post()
  create(@Body() createSensorDto: CreateLightSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSensorDto: UpdateLightSensorDto,
  ) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(id);
  }
}