import { Column, BeforeInsert, Entity, OneToMany } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { BaseEntity } from '../../common/entities/base.entity';
import { Letter } from '../../letter/entities/letter.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ name: 'user_uuid', type: 'uuid', unique: true })
  userUuid: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt: Date;

  @Column({ name: 'last_login_ip', nullable: true })
  lastLoginIp: string;

  @Column({ name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'profile_picture_path', nullable: true })
  profilePicturePath: string;

  @OneToMany(() => Letter, (letter) => letter.user)
  letters: Letter[];

  @BeforeInsert()
  async generateUuid() {
    this.userUuid = uuidv7();
  }
}
