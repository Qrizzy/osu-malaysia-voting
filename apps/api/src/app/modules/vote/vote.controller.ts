import { Controller, BadRequestException, UseGuards, Post, Body, Req, Get, Param, Query } from '@nestjs/common';
import { LoggedInGuard } from '../auth/guards/logged-in.guard';
import { ChoiceService } from '../choice/choice.service';
import { UserService } from '../user/user.service';
import { VoteService } from './vote.service';
import { SubmitVoteDto } from '@osu-voting/models';
import { VoteEntity } from './vote.entity';
import { VoteCollectionEntity } from './vote-collection.entity';
import { AuthenticatedRequest } from '../auth/authenticated-request';

@Controller('/votes')
export class VoteController {
  year = process.env.VOTING_YEAR ? parseInt(process.env.VOTING_YEAR, 10) : 2026;

  constructor(
    private choiceService: ChoiceService,
    private userService: UserService,
    private voteService: VoteService
  ) {}

  @Get()
  async getTotal() {
    try {
      return { totalVotes: (await this.voteService.findCollectionCount()).count };
    } catch {
      throw new BadRequestException();
    }
  }

  @Get('/me')
  @UseGuards(LoggedInGuard)
  async getMyVotes(@Req() req: AuthenticatedRequest) {
    try {
      return await this.voteService.findCollectionForUser(req.user.id);
    } catch {
      throw new BadRequestException();
    }
  }

  private isDevUser(user: any): boolean {
    if (!user) return false;
    return (
      user.id === 8226107 ||
      (user.username && user.username.toLowerCase() === 'chiyuu') ||
      (process.env.ADMIN_USERNAME && user.username === process.env.ADMIN_USERNAME)
    );
  }

  @Get('/dev/progress')
  @UseGuards(LoggedInGuard)
  async getDevProgress(@Req() req: AuthenticatedRequest, @Query('year') year?: string) {
    if (!this.isDevUser(req.user)) {
      throw new BadRequestException('Unauthorized dev access.');
    }
    try {
      const parsedYear = year ? parseInt(year, 10) : this.year;
      return await this.voteService.getLiveProgress(parsedYear);
    } catch {
      throw new BadRequestException();
    }
  }

  @Get('/remarks/:choiceId')
  async getRemarksForChoice(@Param('choiceId') choiceId: string, @Query('year') year?: string) {
    try {
      const parsedId = parseInt(choiceId, 10);
      const parsedYear = year ? parseInt(year, 10) : undefined;
      return await this.voteService.findRemarksForChoice(parsedId, parsedYear);
    } catch {
      throw new BadRequestException();
    }
  }

  @Post()
  @UseGuards(LoggedInGuard)
  async submitVotes(@Req() req: AuthenticatedRequest, @Body() dto: SubmitVoteDto) {
    try {
      const user = req.user;
      if (!user) {
        throw new BadRequestException();
      }

      const now = new Date();
      const votingOpenDate = new Date('2026-11-30T00:00:00+08:00');
      const votingCloseDate = new Date('2026-12-30T23:59:59+08:00');

      if (!this.isDevUser(user) && (now < votingOpenDate || now > votingCloseDate)) {
        throw new BadRequestException('Voting is currently closed. Voting is open from 30.11.2026 to 30.12.2026.');
      }

      const existing = await this.voteService.findCollectionForUser(user.id);
      let deleted = false;
      if (existing) {
        deleted = true;
      }

      const collection: VoteEntity[] = [];
      const chosenIds = [];
      for (const vote of dto.votes) {
        if (vote.userId === 0 || vote.userId == null) {
          continue;
        }

        const choice = await this.choiceService.findByUserId(vote.userId);
        if (!choice) {
          throw new BadRequestException();
        }

        if (chosenIds.indexOf(vote.userId) !== -1) {
          throw new BadRequestException('Duplicate entries found! Please select a player only once.');
        }

        if (vote.userId === user.id) {
          throw new BadRequestException('You cannot vote for yourself! Let others vote for you and be considerate.');
        }

        chosenIds.push(vote.userId);
        const voteEntity = new VoteEntity();
        voteEntity.choiceId = choice.id;
        voteEntity.ranking = vote.ranking;
        voteEntity.remarks = vote.remarks ? vote.remarks.trim() : null;
        collection.push(voteEntity);
      }

      if (chosenIds.length < 10) {
        throw new BadRequestException('You need to pick all 10 people!');
      }

      const collectionEntity = new VoteCollectionEntity();
      collectionEntity.userId = user.id;
      collectionEntity.year = this.year;

      if (deleted) {
        await this.voteService.deleteCollection(existing.id);
      }
      await this.voteService.saveCollection(collectionEntity);

      // Save individual votes
      for (const v of collection) {
        v.voteCollectionId = collectionEntity.id;
        await v.save();
      }

      return { success: true, deleted };
    } catch (e) {
      throw new BadRequestException(e.message ? e.message : undefined);
    }
  }
}
