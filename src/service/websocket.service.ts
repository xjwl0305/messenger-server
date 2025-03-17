import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {RedisCacheService} from "./redis.service";
import {MessageRequestDto, ReadMessageDto, UnreadMessageDto} from "../dto/message.dto";

@Injectable()
export class WebsocketService {
    constructor(
        private readonly redisService: RedisCacheService,
        ){}

    getHello(): string {
        return 'health check!';
    }

    async getData(){
        return await this.redisService.get('abc')
    }

    async sendMessage({sender, room_num, content}: MessageRequestDto){
        const key = `chat:room:${room_num}`;
        const messageId = await this.redisService.incr('chat:message:id');
        const current_date = Date.now()
        await this.redisService.zadd(key, messageId, JSON.stringify({sender, content, current_date, messageId}));
        await this.redisService.expire(key, 86400); // 24시간 후 삭제
        return 'sending success';
    }

    async setLastRead({user_name, room_num, message_id}: ReadMessageDto): Promise<void> {
        const key = `chat:user:${user_name}:lastRead`;
        await this.redisService.hset(key, room_num, message_id);
    }

    async getUnreadMessage({user_name, room_num}: UnreadMessageDto): Promise<any> {
        const lastReadKey = `chat:user:${user_name}:lastRead`;
        const messageKey = `chat:room:${room_num}`;
        const lastMsgId = await this.redisService.hget(lastReadKey, Number(room_num));
        const unreadMessage = await this.redisService.zrangebyscore(messageKey, lastMsgId ?? 0);
        const lastMessageId = unreadMessage.length > 0 ? JSON.parse(unreadMessage.at(-1)!).messageId : null;
        await this.setLastRead({user_name, room_num, message_id: lastMessageId ?? lastMsgId});
        return unreadMessage;
    }
}
