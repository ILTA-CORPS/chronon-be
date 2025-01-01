import { BaseEntity } from '../../common/entities/base.entity';
import { v7 as uuidv7 } from 'uuid';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Letter extends BaseEntity {
  @Column({ name: 'letter_uuid', type: 'uuid', unique: true })
  letterUuid: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'reminder_date', type: 'timestamp' })
  reminderDate: Date;

  @Column({ name: 'is_private', type: 'boolean', default: false })
  isPrivate: boolean;

  @ManyToOne(() => User, (user) => user.letters)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @BeforeInsert()
  async generateUuid() {
    this.letterUuid = uuidv7();
  }
}
