import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
@Injectable()
export class RedisCacheService {
    private readonly redisClient: Redis;

    constructor(private readonly redisService: RedisService) {
        this.redisClient = this.redisService.getOrThrow();
    }
    async get(key: string): Promise<string> {
        return this.redisClient.get(key);
    }

    async incr(key: string): Promise<number> {
        return this.redisClient.incr(key)
    }

    async set(key: string, value: string, expireTime?: number): Promise<'OK'> {
        return this.redisClient.set(key, value, 'EX', expireTime ?? 10);
    }

    async hget(key: string, field: any): Promise<string> {
        return this.redisClient.hget(key, field);
    }

    async hset(key: string, field: any, value: number): Promise<number> {
        return this.redisClient.hset(key, field, value);
    }

    async zadd(key: string, score: number, value: any): Promise<number> {
        return this.redisClient.zadd(key, score, value);
    }

    async zrangebyscore(key: string, value: any): Promise<string[]> {
        return this.redisClient.zrangebyscore(key, `(${value}`, '+inf');
    }

    async lpush(key: string, value: string): Promise<number> {
        return this.redisClient.lpush(key, value);
    }

    async lrange(key: string, pre: number, end: number): Promise<string[]> {
        return this.redisClient.lrange(key, pre, end);
    }

    async expire(key: string, timeout: number): Promise<number> {
        return this.redisClient.expire(key, timeout);
    }

    async del(key: string): Promise<number> {
        return this.redisClient.del(key);
    }
}