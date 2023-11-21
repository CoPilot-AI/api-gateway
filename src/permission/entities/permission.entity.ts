import { Role } from 'src/roles/entities/role.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

// Permission Entity
@Entity()
export class Permission extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  display_name: string;

  @Column()
  description: string;

  @ManyToMany(() => Role, { cascade: true, nullable: true })
  @JoinTable()
  roles: Role[];
}
