import { Injectable, Inject } from '@nestjs/common';
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

  async saveCollection(collection: VoteCollectionEntity): Promise<VoteCollectionEntity> {
    return await collection.save();
  }

  async deleteCollection(collectionId: number): Promise<any> {
    return await this.voteCollectionRepository.destroy({ where: { id: collectionId } });
  }
}
