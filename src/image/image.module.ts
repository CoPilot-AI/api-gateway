import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import HttProxy from 'src/class/http-proxy.service';
import { ConfigModule } from '@nestjs/config';
import { HttpProxyModule } from 'src/http-proxy/http-proxy.module';

@Module({
  imports: [ConfigModule, HttProxy, HttpProxyModule],
  controllers: [ImageController],
  providers: [HttProxy],
})
export class ImageModule {}
