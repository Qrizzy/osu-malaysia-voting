import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ChoiceService } from './choice.service';

@Controller('/choices')
export class ChoiceController {
  constructor(private choiceService: ChoiceService) {}

  @Get()
  async get() {
    return await this.choiceService.findAll();
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
