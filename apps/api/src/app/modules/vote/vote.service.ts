import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { ChoiceEntity } from '../choice/choice.entity';
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

  async getLiveProgress(year?: number) {
    const collectionWhere: any = {};
    if (year) {
      collectionWhere.year = year;
    }

    const collections = await this.voteCollectionRepository.findAll({
      where: Object.keys(collectionWhere).length > 0 ? collectionWhere : undefined,
      include: [
        {
          model: UserEntity,
          attributes: ['id', 'username', 'avatarUrl']
        },
        {
          model: VoteEntity,
          include: [ChoiceEntity]
        }
      ],
      order: [['id', 'DESC']]
    });

    const playerStatsMap = new Map<number, {
      osuId: number;
      username: string;
      globalRank: number;
      countryRank: number;
      pointVotes: number[];
      remarks: { voter: string; ranking: number; text: string }[];
    }>();

    for (const col of collections) {
      const voterName = col.user ? col.user.username : `User #${col.userId}`;
      for (const vote of col.votes || []) {
        if (!vote.choiceId || !vote.ranking) continue;
        const points = Math.max(0, 11 - vote.ranking);
        let entry = playerStatsMap.get(vote.choiceId);
        if (!entry) {
          entry = {
            osuId: vote.choiceId,
            username: vote.choice ? vote.choice.username : `Player #${vote.choiceId}`,
            globalRank: vote.choice ? vote.choice.rank : null,
            countryRank: vote.choice ? vote.choice.countryRank : null,
            pointVotes: [],
            remarks: []
          };
          playerStatsMap.set(vote.choiceId, entry);
        }
        entry.pointVotes.push(points);
        if (vote.remarks && vote.remarks.trim()) {
          entry.remarks.push({
            voter: voterName,
            ranking: vote.ranking,
            text: vote.remarks.trim()
          });
        }
      }
    }

    const standings = Array.from(playerStatsMap.values()).map(player => {
      const sorted = [...player.pointVotes].sort((a, b) => b - a);
      const rawPoints = sorted.reduce((sum, p) => sum + p, 0);
      const trimmedVotes = sorted.length >= 3 ? sorted.slice(1, sorted.length - 1) : sorted;
      const trimmedPoints = trimmedVotes.reduce((sum, p) => sum + p, 0);

      return {
        osuId: player.osuId,
        username: player.username,
        globalRank: player.globalRank,
        countryRank: player.countryRank,
        voteCount: sorted.length,
        rawPoints,
        trimmedPoints,
        pointBreakdown: sorted.join('-'),
        remarks: player.remarks
      };
    }).sort((a, b) => b.trimmedPoints - a.trimmedPoints || b.rawPoints - a.rawPoints);

    return {
      totalVoters: collections.length,
      totalNominees: standings.length,
      standings
    };
  }
}
