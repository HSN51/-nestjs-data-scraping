import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FetchService } from './fetch.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [FetchService],
})
export class FetchModule {} 