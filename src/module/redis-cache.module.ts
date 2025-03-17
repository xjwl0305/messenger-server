import {RedisModule, RedisService} from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import {RedisCacheService} from "../service/redis.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        RedisModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                config:{
                    host: configService.getOrThrow('REDIS_HOST'),
                    port: Number(configService.getOrThrow('REDIS_PORT')),
                    db: configService.getOrThrow('REDIS_DB')
                }
            }),
            inject: [ConfigService],
            imports: [ConfigModule]
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService, RedisModule],
})

export class RedisCacheModule {}