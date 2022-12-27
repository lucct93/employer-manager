import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

export class BaseEntity {
  @Column({ type: 'timestamp with time zone', nullable: true })
  createdAt?: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  updatedAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  createdBy?: string;

  @Column({ type: 'varchar', nullable: true })
  updatedBy?: string;

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }
}
