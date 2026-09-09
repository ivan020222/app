import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TemperatureSensorsModule } from './temperature-sensors/temperature-sensors.module.js';
import { LightSensorsModule } from './light-sensors/light-sensors.module.js';

@Module({
  imports: [TemperatureSensorsModule, LightSensorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
