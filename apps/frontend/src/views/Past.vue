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
          <v-tab href="#2013">2013</v-tab>
          <v-tab href="#2014">2014</v-tab>
          <v-tab href="#2015">2015</v-tab>
          <v-tab href="#2016">2016</v-tab>
          <v-tab href="#2017">2017</v-tab>
          <v-tab href="#2018">2018</v-tab>
          <v-tab href="#2019">2019</v-tab>
          <v-tab href="#2020">2020</v-tab>
        </v-tabs>
      </v-card>

      <v-card class="mt-5">
        <v-tabs-items v-model="tab">
          <v-tab-item value="2013">
            <v-card-title>2013 rankings</v-card-title>
            <v-card-subtitle>Voting by Urio in a closed circle decision. Video: <a href="https://www.youtube.com/watch?v=lLKKTa1YNzs" target="_blank">https://www.youtube.com/watch?v=lLKKTa1YNzs</a></v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2013']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2014">
            <v-card-title>2014 rankings</v-card-title>
            <v-card-subtitle>Voting by JanteSmith in a closed circle decision. Video: <a href="https://www.youtube.com/watch?v=ruDiuFIBCf8" target="_blank">https://www.youtube.com/watch?v=ruDiuFIBCf8</a></v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2014']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2015">
            <v-card-title>2015 rankings</v-card-title>
            <v-card-subtitle>Voting by JanteSmith in a closed circle decision. Video: <a href="https://www.youtube.com/watch?v=Dy1d0Oog0qo" target="_blank">https://www.youtube.com/watch?v=Dy1d0Oog0qo</a></v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2015']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2016">
            <v-card-title>2016 rankings</v-card-title>
            <v-card-subtitle>Voting by Katziezi and PaimonRen in a closed circle decision. Video: <a href="https://www.youtube.com/watch?v=7khAUZEAjUU" target="_blank">https://www.youtube.com/watch?v=7khAUZEAjUU</a></v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2016']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2017">
            <v-card-title>2017 rankings</v-card-title>
            <v-card-subtitle>Voting by _Easy_ in a German community voting format. Video: <a href="https://www.youtube.com/watch?v=D7amtsFU-uE" target="_blank">https://www.youtube.com/watch?v=D7amtsFU-uE</a></v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2017']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2018">
            <v-card-title>2018 rankings</v-card-title>
            <v-card-subtitle>Provided by Dustice in a top 100 DE voting format. Video: <a href="https://www.youtube.com/watch?v=t-MRpecciLA" target="_blank">https://www.youtube.com/watch?v=t-MRpecciLA</a></v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2018']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2019">
            <v-card-title>2019 rankings</v-card-title>
            <v-card-subtitle>Provided by hallowatcher in a first and last international voting format. Video: <a href="https://www.youtube.com/watch?v=hJxnYfBMikc" target="_blank">https://www.youtube.com/watch?v=hJxnYfBMikc</a></v-card-subtitle>

            <Leaderboard :leaderboard="leaderboards['2019']"></Leaderboard>
          </v-tab-item>

          <v-tab-item value="2020">
            <v-card-title>2020 rankings</v-card-title>
            <v-card-subtitle>Voting by hallowatcher.</v-card-subtitle>

            <div class="headline grey--text d-flex align-center justify-center my-10 mx-5">The voting period has ended. The results will be released alongside the video!</div>
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
    tab = '2019';
    leaderboards = {
      '2019': [{
        rank: 1,
        osuId: 4504101,
        username: 'WhiteCat'
      }, {
        rank: 2,
        osuId: 754565,
        owc: true,
        username: 'Dustice'
      }, {
        rank: 3,
        osuId: 3765989,
        owc: true,
        username: 'okinamo'
      }, {
        rank: 4,
        osuId: 2766034,
        owc: true,
        username: 'Umbre'
      }, {
        rank: 5,
        osuId: 1874761,
        owc: true,
        username: 'hallowatcher'
      }, {
        rank: 6,
        osuId: 8147403,
        owc: true,
        username: 'Knalli'
      }, {
        rank: 7,
        osuId: 3256299,
        username: 'Epiphany'
      }, {
        rank: 8,
        osuId: 3772251,
        owc: true,
        username: 'Ephix'
      }, {
        rank: 9,
        osuId: 2282047,
        username: 'Risiing'
      }, {
        rank: 10,
        osuId: 9722332,
        username: 'Ralidea'
      }],

      '2018': [{
        rank: 1,
        osuId: 754565,
        owc: true,
        username: 'Dustice'
      }, {
        rank: 2,
        osuId: 3765989,
        owc: true,
        username: 'okinamo'
      }, {
        rank: 3,
        osuId: 1874761,
        owc: true,
        username: 'hallowatcher'
      }, {
        rank: 4,
        osuId: 2282047,
        owc: true,
        username: 'Risiing'
      }, {
        rank: 5,
        osuId: 2766034,
        owc: true,
        username: 'Umbre'
      }, {
        rank: 6,
        osuId: 1500305,
        username: 'Neliel'
      }, {
        rank: 7,
        osuId: 2022445,
        owc: true,
        username: 'imagaK'
      }, {
        rank: 8,
        osuId: 8147403,
        owc: true,
        username: 'Knalli'
      }, {
        rank: 9,
        osuId: 1856829,
        username: 'Firstus'
      }, {
        rank: 10,
        osuId: 6410154,
        owc: true,
        username: 'BlueSky-'
      }],

      '2017': [{
        rank: 1,
        osuId: 754565,
        owc: true,
        username: 'Dustice'
      }, {
        rank: 2,
        osuId: 2022445,
        owc: true,
        username: 'imagaK'
      }, {
        rank: 3,
        osuId: 1500305,
        owc: true,
        username: 'Neliel'
      }, {
        rank: 4,
        osuId: 1856829,
        owc: true,
        username: 'Firstus'
      }, {
        rank: 5,
        osuId: 2438122,
        owc: true,
        username: 'Beafowl'
      }, {
        rank: 6,
        osuId: 2282047,
        owc: true,
        username: 'Risiing'
      }, {
        rank: 7,
        osuId: 3256299,
        username: 'Epiphany'
      }, {
        rank: 8,
        osuId: 2316517,
        username: 'Duftende Pizza'
      }, {
        rank: 9,
        osuId: 5710809,
        owc: true,
        username: 'Sakurauchi Riko'
      }, {
        rank: 10,
        osuId: 1731277,
        owc: true,
        username: 'Shiratu'
      }],

      '2016': [{
        rank: 1,
        osuId: 754565,
        owc: true,
        username: 'Dustice'
      }, {
        rank: 2,
        osuId: 537084,
        owc: true,
        username: 'DoKito'
      }, {
        rank: 3,
        osuId: 2438122,
        owc: true,
        username: 'Beafowl'
      }, {
        rank: 4,
        osuId: 1874761,
        username: 'hallowatcher'
      }, {
        rank: 5,
        osuId: 1500305,
        owc: true,
        username: 'Neliel'
      }, {
        rank: 6,
        osuId: 2022445,
        owc: true,
        username: 'imagaK'
      }, {
        rank: 7,
        osuId: 1856829,
        owc: true,
        username: 'Firstus'
      }, {
        rank: 8,
        osuId: 1164526,
        owc: true,
        username: 'BDDav'
      }, {
        rank: 9,
        osuId: 4151585,
        username: 'cmnk'
      }, {
        rank: 10,
        osuId: 2070822,
        owc: true,
        username: 'W3SON'
      }],

      '2015': [{
        rank: 1,
        osuId: 754565,
        owc: true,
        username: 'Dustice'
      }, {
        rank: 2,
        osuId: 1164526,
        owc: true,
        username: 'BDDav'
      }, {
        rank: 3,
        osuId: 846038,
        username: 'Splinter572'
      }, {
        rank: 4,
        osuId: 537084,
        username: 'DoKito'
      }, {
        rank: 5,
        osuId: 2438122,
        owc: true,
        username: 'Beafowl'
      }, {
        rank: 6,
        osuId: 495272,
        owc: true,
        username: 'cptnXn'
      }, {
        rank: 7,
        osuId: 1500305,
        owc: true,
        username: 'Neliel'
      }, {
        rank: 8,
        osuId: 2022445,
        username: 'imagaK'
      }, {
        rank: 9,
        osuId: 1856829,
        username: 'Firstus'
      }, {
        rank: 10,
        osuId: 2909663,
        username: 'MarthXT'
      }],

      '2014': [{
        rank: 1,
        osuId: 754565,
        owc: true,
        username: 'Dustice'
      }, {
        rank: 2,
        osuId: 495272,
        owc: true,
        username: 'cptnXn'
      }, {
        rank: 3,
        osuId: 1164526,
        owc: true,
        username: 'BDDav'
      }, {
        rank: 4,
        osuId: 846038,
        owc: true,
        username: 'Splinter572'
      }, {
        rank: 5,
        osuId: 1118341,
        username: 'Jonimay'
      }, {
        rank: 6,
        osuId: 453226,
        owc: true,
        username: 'CookEasy'
      }, {
        rank: 7,
        osuId: 1857058,
        owc: true,
        username: 'Tom94'
      }, {
        rank: 8,
        osuId: 2028641,
        owc: true,
        username: 'shunsuke'
      }, {
        rank: 9,
        osuId: 932342,
        username: 'Michi'
      }, {
        rank: 10,
        osuId: 1818573,
        username: 'Anroyz'
      }],

      '2013': [{
        rank: 1,
        osuId: 453226,
        owc: true,
        username: 'CookEasy'
      }, {
        rank: 2,
        osuId: 495272,
        owc: true,
        username: 'cptnXn'
      }, {
        rank: 3,
        osuId: 932342,
        owc: true,
        username: 'Michi'
      }, {
        rank: 4,
        osuId: 1164526,
        owc: true,
        username: 'BDDav'
      }, {
        rank: 5,
        osuId: 754565,
        owc: true,
        username: 'Dustice'
      }, {
        rank: 6,
        osuId: 494970,
        owc: true,
        username: 'ShadowSoul'
      }, {
        rank: 7,
        osuId: 880002,
        owc: true,
        username: 'dukambe'
      }, {
        rank: 8,
        osuId: 1201224,
        owc: true,
        username: 'Imamoto'
      }, {
        rank: 9,
        osuId: 276991,
        username: 'Lelouch'
      }, {
        rank: 10,
        osuId: 846038,
        username: 'Splinter572'
      }]
    }
  }
</script>
