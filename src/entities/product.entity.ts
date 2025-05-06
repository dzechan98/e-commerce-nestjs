import { BaseEntity } from 'src/entities/base.entity';
import { CategoryEntity } from 'src/entities/category.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ProductEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  category: CategoryEntity;

  @Column({ type: 'float' })
  price: number;

  @Column({ default: 0 })
  sold: number;

  @Column({ default: 0 })
  quantity: number;

  @Column()
  photoURL: string;

  @Column('text', { array: true, default: [] })
  listPhotos: string[];
}
