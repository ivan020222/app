import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LightSensorsService } from './light-sensors.service.js';
import { CreateLightSensorDto } from './dto/create-light-sensor.dto.js';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto.js';

@Controller('light-sensors')
export class LightSensorsController {
  constructor(private readonly lightSensorsService: LightSensorsService) {}
  @Post()
  create(@Body() createSensorDto: CreateLightSensorDto) {
    return this.lightSensorsService.create(createSensorDto);
  }
  @Get()
  findAll() {
    return this.lightSensorsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lightSensorsService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSensorDto: UpdateLightSensorDto,
  ) {
    return this.lightSensorsService.update(id, updateSensorDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lightSensorsService.remove(id);
  }
}