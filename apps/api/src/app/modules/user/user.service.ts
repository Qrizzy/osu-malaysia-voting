import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof UserEntity
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll<UserEntity>({
      attributes: ['id', 'username', 'avatarUrl'],
      order: [['username', 'ASC']]
    });
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return await user.save();
  }

  async updateOrCreate(apiUser: any): Promise<UserEntity> {
    let user = await this.userRepository.findOne({ where: { id: apiUser.id } });
    if (user == null) {
      // Initialize
      user = new UserEntity();
      user.id = apiUser.id;
    }

    user.username = apiUser.username;
    user.avatarUrl = apiUser.avatar_url;
    user.rank = apiUser.statistics ? apiUser.statistics.pp_rank : null;
    user.country = apiUser.country ? apiUser.country.code : null;

    return await this.save(user);
  }
}
