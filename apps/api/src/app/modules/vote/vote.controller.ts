import { Controller, BadRequestException, UseGuards, Post, Body, Req, Get } from '@nestjs/common';
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
  year = 2020;

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

  @Post()
  @UseGuards(LoggedInGuard)
  async submitVotes(@Req() req: AuthenticatedRequest, @Body() dto: SubmitVoteDto) {
    try {
      const user = req.user;
      if (!user) {
        throw new BadRequestException();
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
