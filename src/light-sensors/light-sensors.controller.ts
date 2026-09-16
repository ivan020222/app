import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { LightSensorsService } from './light-sensors.service.js';
import { CreateLightSensorDto } from './dto/create-light-sensor.dto.js';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto.js';
import { LightAlertsService } from './light-alerts.service.js';
import { Observable, map } from 'rxjs';

@Controller('light-sensors')
export class LightSensorsController {
  constructor(
    private readonly lightSensorsService: LightSensorsService,
    private readonly alertsService: LightAlertsService,
  ) {}
  @Post()
  create(@Body() createSensorDto: CreateLightSensorDto) {
    return this.lightSensorsService.create(createSensorDto);
  }
  @Get()
  findAll() {
    return this.lightSensorsService.findAll();
  }
  @Sse('alerts')
  alerts(): Observable<MessageEvent> {
    return this.alertsService.getAlertStream().pipe(
      map((alert) => ({
        data: alert,
      })),
    );
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