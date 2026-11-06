import { Module, NestModule, MiddlewareConsumer, forwardRef, HttpModule, HttpService } from '@nestjs/common';
import { AuthController } from './auth.controller';
import * as passport from 'passport';
import * as OAuth2Strategy from 'passport-oauth2';

import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/user.entity';
import { map } from 'rxjs/operators';
import { ChoiceModule } from '../choice/choice.module';
import { ChoiceService } from '../choice/choice.service';
import { ChoiceEntity } from '../choice/choice.entity';

@Module({
  controllers: [AuthController],
  imports: [
    HttpModule,
    forwardRef(() => UserModule),
    forwardRef(() => ChoiceModule),
  ],
  providers: [],
  exports: []
})
export class AuthModule implements NestModule {
  constructor(private userService: UserService, private httpService: HttpService, private choiceService: ChoiceService) {
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
          callbackURL: process.env.OSU_CALLBACK_URL || 'https://osumy.chiyuu.me/api/auth/callback'
        },
        async (accessToken, refreshToken, profileEmpty, cb) => {
          const apiUser: any = await this.getProfile(accessToken).toPromise();

          // Fetch Malaysian leaderboard if choices are incomplete (< 150), missing global rank, or user is admin
          const choices = await this.choiceService.findAll();
          const shouldFetchChoices = choices.length < 150 || choices.some(c => !c.rank) || apiUser.username === process.env.ADMIN_USERNAME || apiUser.username === 'hallowatcher';

          if (shouldFetchChoices) {
            try {
              const malaysiaLeaderboardPageOne = (await this.getMalaysiaLeaderboard(accessToken, 1).toPromise()).ranking;
              const malaysiaLeaderboardPageTwo = (await this.getMalaysiaLeaderboard(accessToken, 2).toPromise()).ranking;
              const malaysiaLeaderboardPageThree = (await this.getMalaysiaLeaderboard(accessToken, 3).toPromise()).ranking;
              await this.saveChoices(malaysiaLeaderboardPageOne, 1);
              await this.saveChoices(malaysiaLeaderboardPageTwo, 2);
              await this.saveChoices(malaysiaLeaderboardPageThree, 3);
            } catch (err) {
              // Silently handle if rate limited or API error
            }
          }

          const user = await this.userService.updateOrCreate(apiUser);
          return cb(null, user);
        }
      )
    );
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(this.saveReturnUrl).forRoutes('/auth/login', '/auth/logout');

    consumer.apply(passport.authenticate('oauth2', {
      failureRedirect: '/',
      scope: ['public']
    })).forRoutes('/auth/login');

    consumer.apply(passport.authenticate('oauth2', {
      failureRedirect: '/'
    })).forRoutes('/auth/callback');
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

  getMalaysiaLeaderboard(token: string, page: number) {
    const country = process.env.VOTING_COUNTRY || 'MY';
    return this.httpService.get(`https://osu.ppy.sh/api/v2/rankings/osu/performance?country=${country}&cursor[page]=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map(e => e.data)
    );
  }

  getGermanLeaderboard(token: string, page: number) {
    return this.getMalaysiaLeaderboard(token, page);
  }

  async saveChoices(choices: any[], page: number) {
    const perPage = 50;

    await Promise.all(choices.map(async (e, index) => {
      try {
        let choice = await this.choiceService.findByUserId(e.user.id);
        if (!choice) {
          choice = new ChoiceEntity();
          choice.id = e.user.id;
        }
        choice.username = e.user.username;
        choice.country = e.user.country_code;
        choice.rank = e.global_rank ?? e.pp_rank;
        choice.countryRank = (index + 1) + (perPage * (page - 1));
        await this.choiceService.save(choice);
      } catch {
        // Do nothing
      }
    }));
  }
}
