import {
  Controller,
  Get,
  Request,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AllConfigType } from 'src/config/config.type';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('jwt'))
  // @UseGuards(HttpProxyGuard)
  @UseInterceptors(HttpProxyInterceptor)
  @Get()
  async imageIndex(@Request() req, @Res() res, next: () => void) {
    // req.headers['user_id'] = req.user.id;
    console.log('request headers are: ', req.headers);
    const result = await this.httpProxy.httpProxy(req, res, next);
    console.log(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(HttpProxyInterceptor)
  @Get('/*')
  imageRest(@Request() req, @Res() res, next: () => void) {
    this.httpProxy.httpProxy(req, res, next);
  }
}
