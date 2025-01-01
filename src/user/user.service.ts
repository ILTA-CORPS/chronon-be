import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
    private storageService: StorageService,
  ) {}

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return await this.userRepository.remove(user);
  }
}
