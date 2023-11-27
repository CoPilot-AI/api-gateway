import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import HttProxy from 'src/class/http-proxy.service';
import { ConfigModule } from '@nestjs/config';
import { HttpProxyModule } from 'src/http-proxy/http-proxy.module';
import HttpProxyService from 'src/http-proxy/http-proxy.service';
@Module({
  imports: [ConfigModule, HttProxy, HttpProxyModule],
  controllers: [ImageController],
  providers: [HttProxy, HttpProxyService],
})
export class ImageModule {}
