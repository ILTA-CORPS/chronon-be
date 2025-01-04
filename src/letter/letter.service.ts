import { Injectable } from '@nestjs/common';
import { LetterRequestDto } from './dto/letter-request.dto';
import { User as UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Letter as LetterEntity } from './entities/letter.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class LetterService {
  constructor(
    @InjectRepository(LetterEntity)
    private readonly letterRepository: Repository<LetterEntity>,
  ) {}

  create(createLetterDto: LetterRequestDto, user: UserEntity) {
    const letter = this.letterRepository.create({
      content: createLetterDto.content,
      reminderDate: createLetterDto.reminderDate,
      isPrivate: createLetterDto.isPrivate,
      user: user,
    });

    return this.letterRepository.save(letter);
  }

  async findAll(
    user: UserEntity,
    options: IPaginationOptions & {
      search?: string;
    },
  ): Promise<Pagination<LetterEntity>> {
    const queryBuilder = this.letterRepository.createQueryBuilder('letter');
    queryBuilder
      .leftJoinAndSelect('letter.user', 'user')
      .where('user.id = :id', { id: user.id });

    if (options.search) {
      queryBuilder.andWhere('letter.content ILIKE :search', {
        search: `%${options.search}%`,
      });
    }

    queryBuilder.orderBy('letter.created_at', 'ASC');

    return paginate<LetterEntity>(queryBuilder, {
      limit: options.limit || 10,
      page: options.page || 1,
    });
  }

  findOne(id: string, user: UserEntity) {
    return this.letterRepository.findOneOrFail({
      where: {
        letterUuid: id,
        user: { id: user.id },
      },
    });
  }

  async update(
    uuid: string,
    user: UserEntity,
    letterRequestDto: LetterRequestDto,
  ) {
    const letter = await this.letterRepository.findOneOrFail({
      where: {
        letterUuid: uuid,
        user: { id: user.id },
      },
    });

    letter.content = letterRequestDto.content;
    letter.reminderDate = letterRequestDto.reminderDate
      ? new Date(letterRequestDto.reminderDate)
      : null;
    letter.isPrivate = letterRequestDto.isPrivate;

    return this.letterRepository.save(letter);
  }

  async remove(uuid: string, user: UserEntity) {
    const letter = await this.letterRepository.findOneOrFail({
      where: {
        letterUuid: uuid,
        user: { id: user.id },
      },
    });
    return this.letterRepository.remove(letter);
  }
}
