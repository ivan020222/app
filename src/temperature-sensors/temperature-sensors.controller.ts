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
import { TemperatureSensorsService } from './temperature-sensors.service.js';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto.js';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto.js';
import { TemperatureAlertsService } from './temperature-alerts.service.js';
import { Observable, map } from 'rxjs';

@Controller('temperature-sensors')
export class TemperatureSensorsController {
  constructor(
    private readonly temperatureSensorsService: TemperatureSensorsService,
    private readonly alertsService: TemperatureAlertsService,
  ) {}
  @Post()
  create(@Body() createSensorDto: CreateTemperatureSensorDto) {
    return this.temperatureSensorsService.create(createSensorDto);
  }
  @Get()
  findAll() {
    return this.temperatureSensorsService.findAll();
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
    return this.temperatureSensorsService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSensorDto: UpdateTemperatureSensorDto,
  ) {
    return this.temperatureSensorsService.update(id, updateSensorDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temperatureSensorsService.remove(id);
  }
}