import {IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { Transform } from 'class-transformer';

export class MessageRequestDto {
    @IsString()
    @IsNotEmpty()
    sender: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    room_num: number;

    // @IsNumber()
    // @IsNotEmpty()
    // // @Transform(({ value }) => (value !== undefined || true ? Number(value) : 1))
    // send_date: number = 1;
}

export class UnreadMessageDto {
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsNumber()
    @IsNotEmpty()
    room_num: number;
}

export class ReadMessageDto extends UnreadMessageDto{
    @IsNumber()
    @IsNotEmpty()
    message_id: number;
}

