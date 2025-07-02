"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FetchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = require("axios");
const fetch_sources_1 = require("./fetch.sources");
const file_helper_1 = require("../utils/file.helper");
const rate_limit_helper_1 = require("../utils/rate-limit.helper");
let FetchService = FetchService_1 = class FetchService {
    logger = new common_1.Logger(FetchService_1.name);
    isFetching = false;
    async handleCron() {
        if (this.isFetching) {
            this.logger.warn('Previous fetch still running. Skipping this cycle.');
            return;
        }
        this.isFetching = true;
        try {
            for (const source of fetch_sources_1.SOURCES) {
                try {
                    const response = await axios_1.default.get(source.url, {
                        headers: { 'User-Agent': 'NestJS-Data-Scraper' },
                    });
                    await (0, file_helper_1.saveJsonToFile)(source.name, response.data);
                }
                catch (err) {
                    this.logger.error(`Failed to fetch from ${source.name}: ${err.message}`);
                }
                await (0, rate_limit_helper_1.sleep)(2000);
            }
        }
        finally {
            this.isFetching = false;
        }
    }
};
exports.FetchService = FetchService;
__decorate([
    (0, schedule_1.Cron)('* * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FetchService.prototype, "handleCron", null);
exports.FetchService = FetchService = FetchService_1 = __decorate([
    (0, common_1.Injectable)()
], FetchService);
//# sourceMappingURL=fetch.service.js.map