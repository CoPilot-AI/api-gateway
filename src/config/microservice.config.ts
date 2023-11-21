import { registerAs } from '@nestjs/config';
import { MicroServiceConfig } from './config.type';

export default registerAs<MicroServiceConfig>('microservice', () => {
  return {
    imageServiceUrl: process.env.IMAGE_SERVICE_URL ?? 'localhost',
  };
});
