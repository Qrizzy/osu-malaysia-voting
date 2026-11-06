<template>
  <v-row class="past">
    <v-col md="6" offset-md="3">
      <v-card>
        <v-tabs
          dark
          fixed-tabs
          show-arrows
          v-model="tab"
        >
          <!-- <v-tab href="#2013">2013</v-tab> -->
          <v-tab href="#2014">2014</v-tab>
          <v-tab href="#2015">2015</v-tab>
          <v-tab href="#2016">2016</v-tab>
          <v-tab href="#2017">2017</v-tab>
          <v-tab href="#2018">2018</v-tab>
          <v-tab href="#2019">2019</v-tab>
          <v-tab href="#2020">2020</v-tab>
          <v-tab href="#2021">2021</v-tab>
          <v-tab href="#2022">2022</v-tab>
          <v-tab href="#2024">2024</v-tab>
          <v-tab href="#2025">2025</v-tab>
          <v-tab href="#2026">2026</v-tab>
        </v-tabs>
      </v-card>

      <v-card class="mt-5">
        <v-tabs-items v-model="tab">
          <!-- <v-tab-item value="2013">
            <v-card-title>2013 rankings</v-card-title>
            <v-card-subtitle>Voting by Urio in a closed circle decision. Video: <a href="https://www.youtube.com/watch?v=lLKKTa1YNzs" target="_blank">https://www.youtube.com/watch?v=lLKKTa1YNzs</a></v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2013']"></Leaderboard>
          </v-tab-item> -->

          <v-tab-item value="2014">
            <v-card-title>2014 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/605973" target="_blank" class="white--text font-weight-bold ml-1">Jerry</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/263125?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2014']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2015">
            <v-card-title>2015 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/3633477" target="_blank" class="white--text font-weight-bold ml-1">TequilaWolf</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/388014?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=0r_D1VU84z0" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by Rampax
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2015']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2016">
            <v-card-title>2016 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-vote</v-icon>
                24 voters
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-account-group</v-icon>
                25 nominees
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/1163205" target="_blank" class="white--text font-weight-bold ml-1">ffstar</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/527098?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=h8v-7SgF7ik" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by Rampax
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2016']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2017">
            <v-card-title>2017 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-vote</v-icon>
                38 voters
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-account-group</v-icon>
                22 nominees
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/1163205" target="_blank" class="white--text font-weight-bold ml-1">ffstar</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/668510?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=4dcuNpnVazU" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by NazzzF
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2017']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2018">
            <v-card-title>2018 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-vote</v-icon>
                28 voters
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-account-group</v-icon>
                43 nominees
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/4777134" target="_blank" class="white--text font-weight-bold ml-1">Jeffrey</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/829895?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=1F3EeUJeWvM" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by SolarFox
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2018']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2019">
            <v-card-title>2019 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-vote</v-icon>
                44 voters
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-account-group</v-icon>
                31 nominees
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/6088976" target="_blank" class="white--text font-weight-bold ml-1">Tzero</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/993736?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=ymqPuTZ-YmA" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by Koyaiba
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2019']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2020">
            <v-card-title>2020 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-vote</v-icon>
                62 voters
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-account-group</v-icon>
                30 nominees
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/13600612" target="_blank" class="white--text font-weight-bold ml-1">Its Not Marvin</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/1186758?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=EqkJv1CdBxE" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by Koyaiba ft. FaithInOsu
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2020']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2021">
            <v-card-title>2021 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-vote</v-icon>
                58 voters
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-account-group</v-icon>
                30 nominees
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/8691555" target="_blank" class="white--text font-weight-bold ml-1">Sonic-</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/1473515?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=jx7TEE_iu_k" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by LouisZpro
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2021']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2022">
            <v-card-title>2022 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-vote</v-icon>
                35 voters
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-account-group</v-icon>
                19 nominees
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/6231292" target="_blank" class="white--text font-weight-bold ml-1">LouisZpro</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/1686135?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=edmskQqokJ4&t=1396s" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by LouisZpro
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2022']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2024">
            <v-card-title>2024 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-vote</v-icon>
                29 voters
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-account-group</v-icon>
                15 nominees
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/8226107" target="_blank" class="white--text font-weight-bold ml-1">Chiyuu</a><span class="mx-1">&amp;</span><a href="https://osu.ppy.sh/users/9364594" target="_blank" class="white--text font-weight-bold">Sagisawa Arisu</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/2016439?n=1" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=Hg7mYpgE4cM" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by Chiyuu
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2024']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2025">
            <v-card-title>2025 rankings</v-card-title>
            <v-card-subtitle class="d-flex flex-wrap align-center">
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-vote</v-icon>
                71 voters
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="grey lighten-1">
                <v-icon left x-small>mdi-account-group</v-icon>
                39 nominees
              </v-chip>
              <v-chip small outlined class="mr-2 mb-2" color="blue-grey lighten-2">
                <v-icon left x-small>mdi-account-star</v-icon>
                <span>Hosted by <a href="https://osu.ppy.sh/users/8226107" target="_blank" class="white--text font-weight-bold ml-1">Chiyuu</a><span class="mx-1">&amp;</span><a href="https://osu.ppy.sh/users/9364594" target="_blank" class="white--text font-weight-bold">Sagisawa Arisu</a></span>
              </v-chip>
              <v-btn small rounded outlined color="#ff66aa" class="mr-2 mb-2 text-none" href="https://osu.ppy.sh/community/forums/topics/2156052" target="_blank">
                <v-icon left small>mdi-forum</v-icon>
                Forum Post
              </v-btn>
              <v-btn small rounded outlined color="red lighten-1" class="mr-2 mb-2 text-none" href="https://www.youtube.com/watch?v=r0tE1mw-XLI" target="_blank">
                <v-icon left small>mdi-youtube</v-icon>
                Video by Chiyuu
              </v-btn>
            </v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2025']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2026">
            <v-card-title>2026 rankings</v-card-title>
            <v-card-subtitle>osu! Malaysia top 10 voting.</v-card-subtitle>

            <div class="headline grey--text d-flex align-center justify-center my-10 mx-5">The data for this year has not been projected yet. Make sure to cast your votes before the voting period ends!</div>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Leaderboard from '../components/Leaderboard.vue';

  @Component({
    components: {
      Leaderboard
    }
  })
  export default class Past extends Vue {
    tab = '2025';
    leaderboards = {
      '2025': [{
        rank: 1,
        osuId: 2932510,
        username: 'wuhua',
        points: 424
      }, {
        rank: 2,
        osuId: 3995630,
        owc: true,
        username: 'Rampax',
        points: 346
      }, {
        rank: 3,
        osuId: 10343292,
        owc: true,
        username: 'mint breeze',
        points: 298
      }, {
        rank: 4,
        osuId: 18112324,
        username: 'riwoto',
        points: 273
      }, {
        rank: 5,
        osuId: 7440783,
        username: 'Aerora',
        points: 256
      }, {
        rank: 6,
        osuId: 11918602,
        owc: true,
        username: 'mabayu',
        points: 249
      }, {
        rank: 7,
        osuId: 13865320,
        username: 'milosz kitten',
        points: 243
      }, {
        rank: 8,
        osuId: 16436446,
        owc: true,
        username: 'Lunasa',
        points: 232
      }, {
        rank: 9,
        osuId: 7525949,
        username: 'shimon',
        points: 205
      }, {
        rank: 10,
        osuId: 8226107,
        owc: true,
        username: 'Chiyuu',
        points: 159
      }, {
        rank: 11,
        osuId: 12004902,
        username: 'lagoyo',
        points: 128,
        hm: true
      }, {
        rank: 12,
        osuId: 30160132,
        username: 'Comatose',
        points: 96,
        hm: true
      }],

      '2024': [{
        rank: 1,
        osuId: 2932510,
        owc: true,
        username: 'wuhua',
        points: 264
      }, {
        rank: 2,
        osuId: 16436446,
        owc: true,
        username: 'Lunasa',
        points: 210
      }, {
        rank: 3,
        osuId: 14067834,
        owc: true,
        username: 'n0 head',
        points: 201
      }, {
        rank: 4,
        osuId: 3995630,
        owc: true,
        username: 'Rampax',
        points: 143
      }, {
        rank: 5,
        osuId: 7440783,
        username: 'Aerora',
        points: 143
      }, {
        rank: 6,
        osuId: 10343292,
        owc: true,
        username: 'Zeph2003',
        points: 131
      }, {
        rank: 7,
        osuId: 15271985,
        owc: true,
        username: 'AHotDawg',
        points: 85
      }, {
        rank: 8,
        osuId: 30160132,
        username: 'Comatose',
        points: 84
      }, {
        rank: 9,
        osuId: 8226107,
        owc: true,
        username: 'Chiyuu',
        points: 69
      }, {
        rank: 10,
        osuId: 11918602,
        owc: true,
        username: 'Breast',
        points: 68
      }, {
        rank: 11,
        osuId: 5585377,
        username: 'Chibi Maruko',
        points: 38,
        hm: true
      }, {
        rank: 12,
        osuId: 7525949,
        username: 'shimon',
        points: 30,
        hm: true
      }],

      '2022': [{
        rank: 1,
        osuId: 7525949,
        username: 'shimon',
        points: 300
      }, {
        rank: 2,
        osuId: 3995630,
        owc: true,
        username: 'Rampax',
        points: 282
      }, {
        rank: 3,
        osuId: 2932510,
        username: 'wuhua',
        points: 278
      }, {
        rank: 4,
        osuId: 8226107,
        owc: true,
        username: 'Chiyuu',
        points: 149
      }, {
        rank: 5,
        osuId: 15421908,
        username: 'Ariaversary',
        points: 127
      }, {
        rank: 6,
        osuId: 18112324,
        username: 'riwoto',
        points: 116
      }, {
        rank: 7,
        osuId: 10343292,
        username: 'Zeph2003',
        points: 115
      }, {
        rank: 8,
        osuId: 14290988,
        owc: true,
        username: 'Banner',
        points: 110
      }, {
        rank: 9,
        osuId: 6231292,
        username: 'LouisZpro',
        points: 87
      }, {
        rank: 10,
        osuId: 7673764,
        username: 'cloud_chaser02',
        points: 76
      }, {
        rank: 11,
        osuId: 4845266,
        username: 'haruchi',
        points: 59,
        hm: true
      }, {
        rank: 12,
        osuId: 13472074,
        username: 'seabee',
        points: 24,
        hm: true
      }],

      '2021': [{
        rank: 1,
        osuId: 7525949,
        owc: true,
        username: 'Shimon',
        points: 529
      }, {
        rank: 2,
        osuId: 3995630,
        owc: true,
        username: 'Rampax',
        points: 475
      }, {
        rank: 3,
        osuId: 2932510,
        owc: true,
        username: 'wuhua',
        points: 466
      }, {
        rank: 4,
        osuId: 7673764,
        username: 'cloud_chaser02',
        points: 318
      }, {
        rank: 5,
        osuId: 13472074,
        owc: true,
        username: 'seabee',
        points: 297
      }, {
        rank: 6,
        osuId: 4845266,
        owc: true,
        username: 'haruchi',
        points: 285
      }, {
        rank: 7,
        osuId: 6716499,
        owc: true,
        username: 'ShaneLiang',
        points: 236
      }, {
        rank: 8,
        osuId: 10343292,
        username: 'Zeph2003',
        points: 101
      }, {
        rank: 9,
        osuId: 4474918,
        owc: true,
        username: 'Inugami Korone',
        points: 97
      }, {
        rank: 10,
        osuId: 8226107,
        owc: true,
        username: 'Chiyuu',
        points: 63
      }, {
        rank: 11,
        osuId: 13865320,
        username: 'Snowy5441',
        points: 51,
        hm: true
      }, {
        rank: 12,
        osuId: 11716599,
        username: 'Addam',
        points: 35,
        hm: true
      }],

      '2020': [{
        rank: 1,
        osuId: 2932510,
        owc: true,
        username: 'wuhua',
        points: 559
      }, {
        rank: 2,
        osuId: 3995630,
        owc: true,
        username: 'Rampax',
        points: 538
      }, {
        rank: 3,
        osuId: 6716499,
        owc: true,
        username: 'ShaneLiang',
        points: 378
      }, {
        rank: 4,
        osuId: 4474918,
        username: 'Inugami Korone',
        points: 341
      }, {
        rank: 5,
        osuId: 13472074,
        username: 'seabee',
        points: 329
      }, {
        rank: 6,
        osuId: 10584780,
        username: 'Hachune Miku',
        points: 229
      }, {
        rank: 7,
        osuId: 4845266,
        owc: true,
        username: 'haruchi',
        points: 187
      }, {
        rank: 8,
        osuId: 7525949,
        username: 'Shimon',
        points: 135
      }, {
        rank: 9,
        osuId: 2681361,
        owc: true,
        username: 'ClawViper',
        points: 129
      }, {
        rank: 10,
        osuId: 7673764,
        username: 'ALtist',
        points: 76
      }, {
        rank: 11,
        osuId: 11716599,
        username: 'Addam',
        points: 72,
        hm: true
      }, {
        rank: 12,
        osuId: 9375317,
        owc: true,
        username: 'not_aweeb',
        points: 68,
        hm: true
      }],

      '2019': [{
        rank: 1,
        osuId: 3995630,
        owc: true,
        username: 'Rampax',
        points: 385
      }, {
        rank: 2,
        osuId: 4845266,
        username: 'haruchi',
        points: 292
      }, {
        rank: 3,
        osuId: 6088976,
        owc: true,
        username: 'Tzero',
        points: 273
      }, {
        rank: 4,
        osuId: 6716499,
        username: 'ShaneLiang',
        points: 222
      }, {
        rank: 5,
        osuId: 2932510,
        username: 'wuhua',
        points: 212
      }, {
        rank: 6,
        osuId: 6932501,
        owc: true,
        username: 'NOOB1200',
        points: 198
      }, {
        rank: 7,
        osuId: 7399262,
        owc: true,
        username: 'Desumond',
        points: 101
      }, {
        rank: 8,
        osuId: 7673764,
        username: 'MilkyCoffee-',
        points: 73
      }, {
        rank: 9,
        osuId: 7263047,
        owc: true,
        username: 'King Hong',
        points: 67
      }, {
        rank: 10,
        osuId: 1787171,
        owc: true,
        username: 'Rumia-',
        points: 50
      }, {
        rank: 11,
        osuId: 6570008,
        username: 'zhev',
        points: 50,
        hm: true
      }, {
        rank: 12,
        osuId: 8226107,
        owc: true,
        username: 'Chiyuu',
        points: 46,
        hm: true
      }],

      '2018': [{
        rank: 1,
        osuId: 2932510,
        username: 'wuhua',
        points: 400
      }, {
        rank: 2,
        osuId: 6716499,
        username: 'ShaneLiang',
        points: 336
      }, {
        rank: 3,
        osuId: 6088976,
        username: 'Tzero',
        points: 221
      }, {
        rank: 4,
        osuId: 6570008,
        username: 'ZheVulture',
        points: 198
      }, {
        rank: 5,
        osuId: 3633477,
        username: 'TequilaWolf',
        points: 168
      }, {
        rank: 6,
        osuId: 6932501,
        username: 'NOOB1200',
        points: 122
      }, {
        rank: 7,
        osuId: 4845266,
        username: 'haruchi',
        points: 108
      }, {
        rank: 8,
        osuId: 7399262,
        username: 'Desumond',
        points: 105
      }, {
        rank: 9,
        osuId: 7263047,
        username: 'King Hong',
        points: 102
      }, {
        rank: 10,
        osuId: 1787171,
        username: 'Rumia-',
        points: 101
      }, {
        rank: 11,
        osuId: 4777134,
        username: 'Jeffrey',
        points: 78,
        hm: true
      }, {
        rank: 12,
        osuId: 2681361,
        username: 'ClawViper',
        points: 61,
        hm: true
      }],

      '2017': [{
        rank: 1,
        osuId: 2932510,
        owc: true,
        username: 'wuhua',
        points: 346
      }, {
        rank: 2,
        osuId: 3995630,
        owc: true,
        username: 'Rampax',
        points: 295
      }, {
        rank: 3,
        osuId: 2681361,
        owc: true,
        username: 'ClawViper',
        points: 236
      }, {
        rank: 4,
        osuId: 1163205,
        owc: true,
        username: 'ffstar',
        points: 221
      }, {
        rank: 5,
        osuId: 3633477,
        owc: true,
        username: 'TequilaWolf',
        points: 199
      }, {
        rank: 6,
        osuId: 1787171,
        username: 'Rumia-',
        points: 132
      }, {
        rank: 7,
        osuId: 6716499,
        owc: true,
        username: 'ShaneLiang',
        points: 117
      }, {
        rank: 8,
        osuId: 2676512,
        owc: true,
        username: 'Ex6TenZ',
        points: 114
      }, {
        rank: 9,
        osuId: 7399262,
        username: 'Desumond',
        points: 69
      }, {
        rank: 10,
        osuId: 7263047,
        username: 'King Hong',
        points: 65
      }, {
        rank: 11,
        osuId: 7673764,
        username: '- Vyx -',
        points: 57,
        hm: true
      }, {
        rank: 12,
        osuId: 4845266,
        username: 'haruchi',
        points: 42,
        hm: true
      }],

      '2016': [{
        rank: 1,
        osuId: 2681361,
        username: 'ClawViper',
        points: 220
      }, {
        rank: 2,
        osuId: 2276847,
        username: 'Amane-',
        points: 192
      }, {
        rank: 3,
        osuId: 3995630,
        username: 'Rampax',
        points: 187
      }, {
        rank: 4,
        osuId: 5515561,
        username: 'sameperson123',
        points: 177
      }, {
        rank: 5,
        osuId: 3633477,
        username: 'TequilaWolf',
        points: 96
      }, {
        rank: 6,
        osuId: 1787171,
        username: 'Rumia-',
        points: 83
      }, {
        rank: 7,
        osuId: 4025232,
        username: 'TheSomething',
        points: 61
      }, {
        rank: 8,
        osuId: 414427,
        username: 'xsrsbsns',
        points: 53
      }, {
        rank: 9,
        osuId: 818633,
        username: 'sprItzEr',
        points: 46
      }, {
        rank: 10,
        osuId: 3871121,
        username: 'yumesaki-hikari',
        points: 35
      }, {
        rank: 11,
        osuId: 5667763,
        username: 'TayGames',
        points: 28,
        hm: true
      }, {
        rank: 12,
        osuId: 4903850,
        username: 'TechnoTrance123',
        points: 23,
        hm: true
      }],

      '2015': [{
        rank: 1,
        osuId: 414427,
        owc: true,
        username: 'xsrsbsns',
        points: 335
      }, {
        rank: 2,
        osuId: 2681361,
        owc: true,
        username: 'ClawViper',
        points: 262
      }, {
        rank: 3,
        osuId: 3995630,
        owc: true,
        username: 'Rampax',
        points: 247
      }, {
        rank: 4,
        osuId: 583765,
        owc: true,
        username: 'Gon',
        points: 223
      }, {
        rank: 5,
        osuId: 3633477,
        username: 'TequilaWolf',
        points: 192
      }, {
        rank: 6,
        osuId: 818633,
        username: 'sprItzEr',
        points: 149
      }, {
        rank: 7,
        osuId: 2276847,
        owc: true,
        username: 'Amane-',
        points: 140
      }, {
        rank: 8,
        osuId: 1787171,
        owc: true,
        username: 'Rumia-',
        points: 83
      }, {
        rank: 9,
        osuId: 2676512,
        owc: true,
        username: 'Ex6TenZ',
        points: 59
      }, {
        rank: 10,
        osuId: 2205376,
        owc: true,
        username: 'caleb123456',
        points: 45
      }],

      '2014': [{
        rank: 1,
        osuId: 414427,
        owc: true,
        username: 'xsrsbsns',
        points: 249
      }, {
        rank: 2,
        osuId: 2681361,
        username: 'ClawViper',
        points: 205
      }, {
        rank: 3,
        osuId: 3995630,
        username: 'Rampax',
        points: 204
      }, {
        rank: 4,
        osuId: 583765,
        owc: true,
        username: 'Gon',
        points: 175
      }, {
        rank: 5,
        osuId: 3633477,
        owc: true,
        username: 'TequilaWolf',
        points: 157
      }, {
        rank: 6,
        osuId: 818633,
        username: 'sprItzEr',
        points: 129
      }, {
        rank: 7,
        osuId: 2276847,
        username: 'Amane-',
        points: 110
      }, {
        rank: 8,
        osuId: 1787171,
        owc: true,
        username: 'Rumia-',
        points: 76
      }, {
        rank: 9,
        osuId: 2676512,
        owc: true,
        username: 'Ex6TenZ',
        points: 73
      }, {
        rank: 10,
        osuId: 2205376,
        owc: true,
        username: 'caleb123456',
        points: 65
      }],
    };
  }
</script>
