import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SOURCES } from './fetch.sources';
import { saveJsonToFile } from '../utils/file.helper';
import { sleep } from '../utils/rate-limit.helper';

@Injectable()
export class FetchService {
  private readonly logger = new Logger(FetchService.name);
  private isFetching = false;

  @Cron('* * * * *') // Every 1 minute
  async handleCron() {
    if (this.isFetching) {
      this.logger.warn('Previous fetch still running. Skipping this cycle.');
      return;
    }
    this.isFetching = true;
    try {
      for (const source of SOURCES) {
        try {
          const response = await axios.get(source.url, {
            headers: { 'User-Agent': 'NestJS-Data-Scraper' },
          });
          await saveJsonToFile(source.name, response.data);
        } catch (err) {
          this.logger.error(`Failed to fetch from ${source.name}: ${err.message}`);
        }
        await sleep(2000); // 2 seconds RPM protection
      }
    } finally {
      this.isFetching = false;
    }
  }
} 