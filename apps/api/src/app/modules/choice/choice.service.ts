import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ChoiceEntity } from './choice.entity';
import { delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class ChoiceService {
  constructor(
    @Inject('CHOICE_REPOSITORY')
    private readonly choiceRepository: typeof ChoiceEntity,
    private httpService: HttpService
  ) {}

  async findAll(): Promise<ChoiceEntity[]> {
    return await this.choiceRepository.findAll<ChoiceEntity>({
      attributes: ['id', 'username', 'countryRank', 'rank'],
      order: [['countryRank', 'ASC']]
    });
  }

  async findByUserId(id: number): Promise<ChoiceEntity> {
    return await this.choiceRepository.findOne({
      where: { id }
    });
  }

  async save(choice: ChoiceEntity) {
    return await choice.save();
  }

  async createWithUsername(username: string): Promise<ChoiceEntity> {
    const user = await this.getUserByUsername(username).toPromise();
    const choice = new ChoiceEntity();
    choice.username = user.username;
    choice.id = +user.user_id;
    choice.rank = +user.pp_rank;
    choice.countryRank = +user.pp_country_rank;
    choice.country = user.country;
    choice.joinedAt = moment(user.join_date).utc(true).toDate();
    return await this.save(choice);
  }

  private getUserByUsername(username: string): Observable<any> {
    const fixedUser = username.trim().replace(' ', '_');
    const v1token = process.env.OSU_API_KEY;
    if (!v1token || v1token === '') {
      return;
    }

    return this.httpService.get(`https://osu.ppy.sh/api/get_user?k=${v1token}&u=${fixedUser}`).pipe(
      delay(2000),
      map(e => e.data[0])
    );
  }
}
