import { IsString, IsEnum, IsArray } from 'class-validator';

enum ChannelType {
  Public = 'public',
  Private = 'private',
}

export class CreateChannelDto {
  @IsString()
  title: string;

  @IsEnum(ChannelType)
  type: string;

  @IsArray()
  user_id: number;
}
