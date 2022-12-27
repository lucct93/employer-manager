import { BaseEntity, EGender } from '../shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: EGender, nullable: true })
  gender: EGender;

  @Column({ type: 'varchar', length: 200, nullable: true })
  photo: string;
}
