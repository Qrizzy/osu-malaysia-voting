<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left" style="width: 10%;">#</th>
          <th class="text-left" :style="{ width: hasPoints ? '50%' : '65%' }">Username</th>
          <th v-if="hasPoints" class="text-left" style="width: 15%;">Points</th>
          <th class="text-left" style="width: 25%;"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in leaderboard" :key="user.username">
          <td>{{ user.rank }}</td>
          <td>
            <v-avatar size="36">
              <img :src="'https://a.ppy.sh/' + user.osuId" alt="avatar">
            </v-avatar>

            <v-badge bordered color="red" content="owc" inline :value="user.owc ? user.owc : false">
              <v-badge bordered color="grey" content="HM" inline :value="user.hm ? user.hm : (user.rank === 11 || user.rank === 12)">
                <span class="ml-3">{{ user.username }}</span>
              </v-badge>
            </v-badge>
          </td>
          <td v-if="hasPoints">{{ user.points !== undefined ? user.points : '-' }}</td>
          <td style="text-align: right; white-space: nowrap;">
            <v-btn x-small text color="amber" @click="openRemarks(user)">remarks</v-btn>
            <v-btn x-small text @click="openProfile(user.osuId)">profile</v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog v-model="remarksDialog" max-width="600">
      <v-card v-if="selectedUser">
        <v-card-title class="d-flex align-center">
          <v-avatar size="40" class="mr-3">
            <img :src="'https://a.ppy.sh/' + selectedUser.osuId" alt="avatar">
          </v-avatar>
          <div>
            <div>Voter Remarks for {{ selectedUser.username }}</div>
            <div class="caption grey--text">Rank #{{ selectedUser.rank }}</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon @click="remarksDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="py-4">
          <div v-if="loadingRemarks" class="d-flex justify-center my-6">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>

          <div v-else-if="activeRemarks.length === 0" class="text-center grey--text my-6">
            No voter remarks recorded for this player yet.
          </div>

          <v-list v-else two-line>
            <template v-for="(item, idx) in activeRemarks">
              <v-list-item :key="idx" class="px-0">
                <v-list-item-avatar v-if="item.voter && item.voter.id">
                  <img :src="'https://a.ppy.sh/' + item.voter.id" alt="voter">
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    <span>{{ item.voter ? item.voter.username : 'Anonymous Voter' }}</span>
                    <v-chip x-small color="primary" class="ml-2" v-if="item.ranking">Voted #{{ item.ranking }}</v-chip>
                  </v-list-item-title>
                  <div class="body-2 mt-1" style="white-space: pre-wrap;">{{ item.remarks }}</div>
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="idx < activeRemarks.length - 1" :key="'div-' + idx"></v-divider>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
  tr:hover {
    background: transparent !important;
  }
</style>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import axios from 'axios';

  export interface VoterRemark {
    ranking?: number;
    remarks: string;
    voter?: {
      id?: number;
      username: string;
      avatarUrl?: string;
    };
  }

  export interface User {
    rank: number;
    osuId: number;
    owc?: boolean;
    hm?: boolean;
    username: string;
    points?: number;
    remarks?: VoterRemark[];
  }

  @Component
  export default class Leaderboard extends Vue {
    @Prop() leaderboard: User[];

    remarksDialog = false;
    loadingRemarks = false;
    selectedUser: User | null = null;
    activeRemarks: VoterRemark[] = [];

    get hasPoints(): boolean {
      return Boolean(this.leaderboard && this.leaderboard.some(user => user.points !== undefined));
    }

    openProfile(osuId: number) {
      window.open(`https://osu.ppy.sh/users/${osuId}`, '_blank');
    }

    async openRemarks(user: User) {
      this.selectedUser = user;
      this.remarksDialog = true;

      if (user.remarks && user.remarks.length > 0) {
        this.activeRemarks = user.remarks;
        return;
      }

      this.loadingRemarks = true;
      this.activeRemarks = [];
      try {
        const res = await axios.get(`/api/votes/remarks/${user.osuId}`);
        this.activeRemarks = res.data || [];
      } catch {
        this.activeRemarks = [];
      } finally {
        this.loadingRemarks = false;
      }
    }
  }
</script>
