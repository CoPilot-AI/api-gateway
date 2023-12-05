import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AllConfigType } from 'src/config/config.type';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import HttpProxyService from '../http-proxy/http-proxy.service';
import { HttpProxyInterceptor } from 'src/http-proxy/http-proxy.interceptor';

@ApiTags('Images')
@Controller({
  path: 'images',
  version: '1',
})
export class ImageController {
  private readonly httpProxy: HttpProxyService;
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    const imageUrl = this.configService.getOrThrow(
      'microservice.imageServiceUrl',
      {
        infer: true,
      },
    );
    this.httpProxy = new HttpProxyService(imageUrl);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(HttpProxyGuard)
  @UseInterceptors(HttpProxyInterceptor)
  @Get()
  imageIndex(@Request() req, @Res() res, next: () => void) {
    this.httpProxy.httpProxy(req, res, next);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(HttpProxyInterceptor)
  @Get('/*')
  imageRest(@Request() req, @Res() res, next: () => void) {
    this.httpProxy.httpProxy(req, res, next);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(HttpProxyInterceptor)
  @Post('/*')
  imagePost(@Request() req, @Res() res, next: () => void) {
    this.httpProxy.httpProxy(req, res, next);
  }
}
