import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class CategoryEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  photoURL: string;

  @Column({ unique: true })
  slug: string;
}
