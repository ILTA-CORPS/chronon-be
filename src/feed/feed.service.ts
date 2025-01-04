import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Letter as LetterEntity } from '../letter/entities/letter.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(LetterEntity)
    private readonly letterRepository: Repository<LetterEntity>,
  ) {}

  async findAll(
    options: IPaginationOptions & { search?: string },
  ): Promise<Pagination<LetterEntity>> {
    const queryBuilder = this.letterRepository.createQueryBuilder('letter');

    queryBuilder.leftJoinAndSelect('letter.user', 'user');

    queryBuilder.where('letter.is_anonymous = false');

    if (options.search) {
      queryBuilder.where('letter.content ILIKE :search', {
        search: `%${options.search}%`,
      });
    }

    queryBuilder.orderBy('letter.created_at', 'ASC');

    return paginate<LetterEntity>(queryBuilder, {
      limit: options.limit || 10,
      page: options.page || 1,
    });
  }

  findOne(id: string) {
    return this.letterRepository.findOneOrFail({
      where: {
        letterUuid: id,
        isAnonymous: false,
      },
    });
  }
}
