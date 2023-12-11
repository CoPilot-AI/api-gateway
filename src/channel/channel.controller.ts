import { Controller, Get } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/create')
  createChannel() {
    return this.channelService.createChannel({
      title: 'test',
      type: 'private',
      user_id: 1,
    });
  }
}
