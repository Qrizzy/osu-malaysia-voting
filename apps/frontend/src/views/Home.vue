<template>
  <div class="home">
    <section>
      <v-parallax src="../assets/bg.jpg" :height="parallaxHeight" alt="BG">
        <v-overlay absolute color="#000000" opacity="0.8">
          <div class="d-flex flex-column align-center justify-center px-4">
            <h1 class="white--text mb-2 text-h4 text-sm-h3 text-md-h2 font-weight-light text-center">
              osu! Malaysia Top 15 Players 2026
            </h1>
            <div class="white--text subtitle-1 text-center mb-1">
              Historical archive (2014–2025) &amp; 2026 Top 15 results showcase
            </div>
            <div class="grey--text subtitle-2 mb-4 text-center">
              {{ hasVotingEnded ? '2026 voting has closed — results coming soon!' : '2026 voting is hosted at omy.sh145.site' }}
            </div>
          </div>

          <div class="d-flex flex-column flex-sm-row flex-wrap mt-3 align-center justify-center px-4">
            <v-btn
              v-if="!hasVotingEnded"
              large
              color="#ff66aa"
              dark
              class="mb-2 mb-sm-0 font-weight-bold text-none"
              href="https://omy.sh145.site"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vote at omy.sh145.site
              <v-icon right small>mdi-open-in-new</v-icon>
            </v-btn>

            <v-btn
              v-else
              large
              to="/past#2026"
              color="#ff66aa"
              dark
              class="mb-2 mb-sm-0 font-weight-bold text-none"
            >
              View 2026 Results
            </v-btn>

            <div class="d-flex align-center justify-center">
              <v-btn large to="/past" class="ml-sm-3" text>
                Past results
              </v-btn>

              <v-btn large to="/about" class="ml-2 ml-sm-3" text>
                About
              </v-btn>
            </div>
          </div>
        </v-overlay>
      </v-parallax>
    </section>
  </div>
</template>

<style lang="scss">
.home {
  margin: -12px;
  overflow: hidden;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const VOTING_CLOSE_DATE = new Date('2026-12-30T23:59:59+08:00');

@Component({})
export default class Home extends Vue {
  get parallaxHeight(): number {
    const vh = this.$vuetify?.breakpoint?.height || (typeof window !== 'undefined' ? window.innerHeight : 800);
    return Math.max(450, vh - 160);
  }

  get hasVotingEnded(): boolean {
    return new Date() > VOTING_CLOSE_DATE;
  }
}
</script>
