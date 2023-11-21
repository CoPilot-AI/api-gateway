import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import HttProxy from 'src/class/http-proxy.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  controllers: [ImageController],
  providers: [ImageService, HttProxy],
})
export class ImageModule {}
