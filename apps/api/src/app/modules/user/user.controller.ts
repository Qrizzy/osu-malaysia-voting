import { Controller, Get, Param, BadRequestException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('/users')
@UseGuards(AdminGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async get() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    try {
      return await this.userService.findById(Number(id));
    } catch {
      throw new BadRequestException();
    }
  }
}
