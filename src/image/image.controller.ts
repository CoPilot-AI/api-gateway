import HttProxy from 'src/class/http-proxy.service';
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

@ApiTags('Images')
@Controller({
  path: 'images',
  version: '1',
})
export class ImageController {
  private readonly httpProxy: HttProxy;
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    const imageUrl = this.configService.getOrThrow(
      'microservice.imageServiceUrl',
      {
        infer: true,
      },
    );
    this.httpProxy = new HttProxy(imageUrl);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  imageIndex(@Request() req, @Res() res, next: () => void) {
    this.httpProxy.httpProxy(req, res, next);
  }

  @Get('/*')
  imageRest(@Request() req, @Res() res, next: () => void) {
    this.httpProxy.httpProxy(req, res, next);
  }
}
