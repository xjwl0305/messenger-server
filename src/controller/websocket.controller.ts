import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {WebsocketService} from "../service/websocket.service";
import {MessageRequestDto, ReadMessageDto, UnreadMessageDto} from "../dto/message.dto";

@Controller('/websocket')
export class WebsocketController {
    constructor(private readonly appService: WebsocketService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/test-get')
    getData() {
        return this.appService.getData();
    }

    @Post('/sending-message')
    sendMessage(@Body() req: MessageRequestDto) {
        return this.appService.sendMessage(req);
    }

    @Post('/set-last-read')
    setLastRead(@Body() req: ReadMessageDto) {
        return this.appService.setLastRead(req);
    }

    @Get('/read-message')
    readMessage(@Query() req: UnreadMessageDto) {
        return this.appService.getUnreadMessage(req)
    }
}