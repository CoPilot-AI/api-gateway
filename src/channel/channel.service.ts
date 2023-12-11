import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateChannelDto } from './dto/create-channel.dto';
import { AllConfigType } from 'src/config/config.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChannelService {
  private readonly channelUrl: string;
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.channelUrl = this.configService.getOrThrow(
      'microservice.imageServiceUrl',
      {
        infer: true,
      },
    );
  }
  async createChannel(channelDto: CreateChannelDto): Promise<any> {
    try {
      const response = await axios.post(
        this.channelUrl + '/images/channels',
        channelDto,
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to create channel');
    }
  }
}
