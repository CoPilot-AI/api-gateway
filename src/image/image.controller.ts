import {
  Controller,
  Get,
  Request,
  Res,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AllConfigType } from 'src/config/config.type';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import HttpProxyService from '../http-proxy/http-proxy.service';

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
  @Get()
  imageIndex(@Request() req, @Res() res, next: () => void) {
    console.log('imageIndex');
    this.httpProxy.httpProxy(req, res, next);
  }

  @Get('/*')
  imageRest(@Request() req, @Res() res, next: () => void) {
    this.httpProxy.httpProxy(req, res, next);
  }
}
