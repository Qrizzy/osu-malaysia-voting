<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left" style="width: 10%;">#</th>
        <th class="text-left" :style="{ width: hasPoints ? '55%' : '75%' }">Username</th>
        <th v-if="hasPoints" class="text-left" style="width: 20%;">Points</th>
        <th class="text-left" style="width: 15%;"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in leaderboard" :key="user.username">
        <td>{{ user.rank }}</td>
        <td>
          <div class="d-flex align-center py-1">
            <v-avatar size="32" class="flex-shrink-0">
              <img :src="'https://a.ppy.sh/' + user.osuId" alt="avatar">
            </v-avatar>

            <v-badge bordered color="red" content="owc" inline :value="user.owc ? user.owc : false">
              <v-badge bordered color="grey" content="HM" inline :value="Boolean(user.hm)">
                <span class="ml-2 ml-sm-3">{{ user.username }}</span>
              </v-badge>
            </v-badge>
          </div>
        </td>
        <td v-if="hasPoints">{{ user.points !== undefined ? user.points : '-' }}</td>
        <td style="text-align: right; white-space: nowrap;">
          <v-btn
            v-if="resultYear"
            x-small
            outlined
            rounded
            color="#ff66aa"
            class="mr-1 text-none font-weight-bold"
            :to="`/${resultYear}/${user.rank}`"
          >
            Result
          </v-btn>
          <v-btn x-small text @click="openProfile(user.osuId)">profile</v-btn>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<style lang="scss" scoped>
  tr:hover {
    background: transparent !important;
  }

  @media (max-width: 600px) {
    ::v-deep th,
    ::v-deep td {
      padding: 0 8px !important;
    }
  }
</style>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  export interface User {
    rank: number;
    osuId: number;
    owc?: boolean;
    hm?: boolean;
    username: string;
    points?: number;
  }

  @Component
  export default class Leaderboard extends Vue {
    @Prop() leaderboard: User[];
    @Prop({ default: '' }) resultYear!: string;

    get hasPoints(): boolean {
      return Boolean(this.leaderboard && this.leaderboard.some(user => user.points !== undefined));
    }

    openProfile(osuId: number) {
      window.open(`https://osu.ppy.sh/users/${osuId}`, '_blank');
    }
  }
</script>
