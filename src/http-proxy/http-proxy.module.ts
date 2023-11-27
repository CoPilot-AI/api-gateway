import { Module } from '@nestjs/common';
import HttpProxyService from './http-proxy.service';

@Module({
  controllers: [],
  providers: [HttpProxyService],
})
export class HttpProxyModule {}
