import { UserEntity } from '../user/user.entity';

export type AuthenticatedRequest = Request & { user: UserEntity };
