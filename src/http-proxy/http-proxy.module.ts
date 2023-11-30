import { Module } from '@nestjs/common';
import HttpProxyService from './http-proxy.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule, UsersModule],
  providers: [HttpProxyService, JwtService],
  exports: [JwtModule, UsersModule],
})
export class HttpProxyModule {}
