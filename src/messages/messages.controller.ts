import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';


@Controller("messages")
export class MessagesController {
    messagesService: MessagesService;

    constructor() {
        // DONT DO THIS ON REAL APPS
        // USE DEPENDENCY INJECTION
        this.messagesService = new MessagesService;
    }

    @Get()
    getAllMessages() {
        return this.messagesService.findAll();
    }

    @Get("/:id")
    async getMessageById(@Param("id") id: string) {
        console.log("id: ", id)
        const message = await this.messagesService.findOne(id);

        if (!message) {
            throw new NotFoundException("message not found");
        }

        message
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        console.log("body: ", body);
        return this.messagesService.create(body.content);
    }
}
