import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionSeedService {
  constructor(
    @InjectRepository(Permission)
    private repository: Repository<Permission>,
  ) {}

  run() {
    console.log('PermissionSeedService.run()');
  }
}
