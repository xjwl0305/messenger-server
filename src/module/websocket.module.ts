import { Module } from '@nestjs/common';
import {WebsocketController} from "../controller/websocket.controller";
import {WebsocketService} from "../service/websocket.service";
import {RedisCacheService} from "../service/redis.service";
import {ConfigModule, ConfigService} from '@nestjs/config';
import {RedisModule, RedisModuleOptions} from "@nestjs-modules/ioredis";
import {ConfigurationModule} from "./configure.module";
import {RedisCacheModule} from "./redis-cache.module";

@Module({
    imports: [
        ConfigurationModule,
        RedisCacheModule,

    ],
    controllers: [WebsocketController],
    providers: [WebsocketService, RedisCacheService],
})
export class AppModule {}
