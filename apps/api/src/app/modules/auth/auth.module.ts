import { Module, NestModule, MiddlewareConsumer, forwardRef, HttpModule, HttpService } from '@nestjs/common';
import { AuthController } from './auth.controller';
import * as passport from 'passport';
import * as OAuth2Strategy from 'passport-oauth2';

import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/user.entity';
import { map } from 'rxjs/operators';

@Module({
  controllers: [AuthController],
  imports: [
    HttpModule,
    forwardRef(() => UserModule)
  ],
  providers: [],
  exports: []
})
export class AuthModule implements NestModule {
  constructor(private userService: UserService, private httpService: HttpService) {
    passport.serializeUser((user: UserEntity, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
      const user = await this.userService.findById(id);
      done(null, user);
    });

    passport.use(
      new OAuth2Strategy(
        {
          authorizationURL: 'https://osu.ppy.sh/oauth/authorize?scope=identify',
          tokenURL: 'https://osu.ppy.sh/oauth/token',
          clientID: process.env.OSU_CLIENT_ID,
          clientSecret: process.env.OSU_CLIENT_SECRET,
          callbackURL: process.env.OSU_CALLBACK_URL
        },
        async (accessToken, refreshToken, profileEmpty, cb) => {
          const apiUser: any = await this.getProfile(accessToken).toPromise();
          const user = await this.userService.updateOrCreate(apiUser);
          return cb(null, user);
        }
      )
    );
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(this.saveReturnUrl).forRoutes('/auth/login', '/auth/logout');
    consumer.apply(passport.authenticate('oauth2', { failureRedirect: '/' })).forRoutes('/auth/login', '/auth/callback');
  }

  private saveReturnUrl(req, res, next) {
    if (req.query.redirect) {
      req.session.oauth2return = decodeURIComponent(req.query.redirect);
    } else {
      req.session.oauth2return = null;
    }

    next();
  }

  getProfile(token: string) {
    return this.httpService.get('https://osu.ppy.sh/api/v2/me/osu', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map(e => e.data)
    );
  }
}
