import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class AuthConfirmUser {
  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['User'], {
    message: 'userNotExists',
  })
  id: number;
}
