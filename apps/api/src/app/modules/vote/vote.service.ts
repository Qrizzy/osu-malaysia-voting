import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { UserEntity } from '../user/user.entity';
import { VoteCollectionEntity } from './vote-collection.entity';
import { VoteEntity } from './vote.entity';

@Injectable()
export class VoteService {
  constructor(
    @Inject('VOTE_COLLECTION_REPOSITORY')
    private readonly voteCollectionRepository: typeof VoteCollectionEntity,
    @Inject('VOTE_REPOSITORY')
    private readonly voteRepository: typeof VoteEntity
  ) {}

  async findAllCollections(): Promise<VoteCollectionEntity[]> {
    return await this.voteCollectionRepository.findAll({
      order: [['userId', 'ASC']]
    });
  }

  async findCollectionCount() {
    return await this.voteCollectionRepository.findAndCountAll();
  }

  async findCollectionForUser(userId: number): Promise<VoteCollectionEntity> {
    return await this.voteCollectionRepository.findOne({
      where: {
        userId,
      },
      include: [{ all: true }]
    });
  }

  async findRemarksForChoice(choiceId: number, year?: number) {
    const collectionWhere: any = {};
    if (year) {
      collectionWhere.year = year;
    }

    const votes = await this.voteRepository.findAll({
      where: {
        choiceId,
        remarks: {
          [Op.and]: [
            { [Op.ne]: null },
            { [Op.ne]: '' }
          ]
        }
      },
      include: [{
        model: VoteCollectionEntity,
        where: Object.keys(collectionWhere).length > 0 ? collectionWhere : undefined,
        include: [{
          model: UserEntity,
          attributes: ['id', 'username', 'avatarUrl']
        }]
      }],
      order: [['ranking', 'ASC']]
    });

    return votes.map(v => ({
      ranking: v.ranking,
      remarks: v.remarks,
      voter: v.voteCollection?.user ? {
        id: v.voteCollection.user.id,
        username: v.voteCollection.user.username,
        avatarUrl: v.voteCollection.user.avatarUrl
      } : null
    }));
  }

  async saveCollection(collection: VoteCollectionEntity): Promise<VoteCollectionEntity> {
    return await collection.save();
  }

  async deleteCollection(collectionId: number): Promise<any> {
    return await this.voteCollectionRepository.destroy({ where: { id: collectionId } });
  }
}
