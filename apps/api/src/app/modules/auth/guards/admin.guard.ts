import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user) {
      throw new ForbiddenException('You are not logged in!');
    }

    const user = await this.userService.findById(req.user.id);
    if (!user || !user.admin) {
      throw new ForbiddenException('Unauthorized!');
    }

    return true;
  }
}
