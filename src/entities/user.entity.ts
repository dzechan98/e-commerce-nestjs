import { BaseEntity } from 'src/entities/base.entity';
import { Gender } from 'src/types/gender';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  photoURL: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({ nullable: true })
  dob: Date;
}
