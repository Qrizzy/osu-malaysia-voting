import { Controller, Get, Res, UseGuards, Req } from '@nestjs/common';
import { LoggedInGuard } from './guards/logged-in.guard';
import { UserService } from '../user/user.service';

@Controller('/auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Get('/login')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login() { }

  @Get('/callback')
  callback(@Req() req, @Res() res) {
    res.redirect(req.session.oauth2return || '/');
  }

  @Get('/logout')
  @UseGuards(LoggedInGuard)
  async logout(@Req() req, @Res() res) {
    await req.logout();
    res.redirect('/');
  }

  @Get('/user')
  @UseGuards(LoggedInGuard)
  async user(@Req() req) {
    return await this.userService.findById(req.user.id);
  }
}
