<template>
  <v-row class="past">
    <v-col md="6" offset-md="3">
      <v-card v-if="currentUser">
        <v-card-title>2020 Voting</v-card-title>
        <v-card-subtitle>Vote for the German top 10 of 2020</v-card-subtitle>

        <v-card-text>

          <v-card>
            <v-card-text>
              <h3>Voting format</h3>
              <p>This year's voting will only account for the German voters in the top 1000 of Germany. International votes will still be possible to have a comparison in the end, but will not count towards the final rankings.</p>
              <p>The point distribution will be as follows: 7, 6, 5, 5, 4, 4, 3, 3, 2, 1</p>
              <p>The point multiplier will apply as follows: 1 - 10 DE x5, 11 - 25 DE x4, 26 - 50 DE x3, 50 - 100 DE x2, > 101 DE x1</p>
            </v-card-text>
          </v-card>

          <v-card class="mt-3">
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="'https://a.ppy.sh/' + currentUser.id"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <span>Logged in as <b>{{ currentUser.username }}</b></span>

                    <v-chip-group>
                      <v-chip small v-if="votingCounts">Voting counts</v-chip>
                      <v-chip small v-if="!votingCounts">Voting will not count</v-chip>
                      <v-chip small v-if="votingCounts">Multiplier x{{multiplier}}</v-chip>
                    </v-chip-group>
                  </v-list-item-content>
                </v-list-item>
              </v-list>


              Voting goes here
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import { namespace } from 'vuex-class';

  const auth = namespace('Auth');

  @Component({})
  export default class Vote extends Vue {
    @auth.State
    currentUser: any;

    votingCounts = false;
    multiplier = 0;
    countryCode = 'DE';
    countryRankLimit = 1000;

    mounted() {
      this.votingCounts = this.currentUser.country === this.countryCode && this.currentUser.countryRank <= this.countryRankLimit;
      if (this.votingCounts) {
        if (this.currentUser.countryRank >= 1 && this.currentUser.countryRank <= 10) {
          this.multiplier = 5;
        }

        if (this.currentUser.countryRank >= 11 && this.currentUser.countryRank <= 25) {
          this.multiplier = 4;
        }

        if (this.currentUser.countryRank >= 26 && this.currentUser.countryRank <= 50) {
          this.multiplier = 3;
        }

        if (this.currentUser.countryRank >= 51 && this.currentUser.countryRank <= 100) {
          this.multiplier = 2;
        }

        if (this.currentUser.countryRank >= 101) {
          this.multiplier = 1;
        }
      }
    }
  }
</script>
