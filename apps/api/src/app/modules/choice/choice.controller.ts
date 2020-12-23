import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { LoggedInGuard } from '../auth/guards/logged-in.guard';
import { AuthenticatedRequest } from '../auth/authenticated-request';

@Controller('/choices')
@UseGuards(LoggedInGuard)
export class ChoiceController {
  constructor(private choiceService: ChoiceService) {}

  @Get()
  async get(@Req() req: AuthenticatedRequest) {
    const choices = await this.choiceService.findAll();
    return choices.filter(e => e.id !== req.user.id);
  }

  // @Post()
  // async post(@Body('username') username: string) {
  //   if (!username || username === '') {
  //     console.log(username);
  //     throw new BadRequestException();
  //   }
  //
  //   return await this.choiceService.createWithUsername(username);
  // }
}
