<template>
  <v-row class="about">
    <v-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2" lg="6" offset-lg="3">
      <v-card>
        <v-img height="100px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-overlay class="align-end justify-start" absolute color="#000000" opacity="0.8">
            <v-card-title>About the Malaysian voting</v-card-title>
          </v-overlay>
        </v-img>

        <v-card-subtitle class="pb-0">Short summary</v-card-subtitle>
        <v-card-text class="text--primary">
          The osu! Malaysia Top 10 Voting is an annual community poll to determine the best performing Malaysian osu! players of the year. Anyone from any country is welcome to participate, provided their account and list follow the voting criteria below.

          <v-expansion-panels focusable class="my-6">
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold">
                <span><v-icon left color="red">mdi-calculator-variant</v-icon> Scoring Formula &amp; Point Calculation</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-3">
                <ul>
                  <li class="mb-2">
                    Players are awarded points from <b>1st – 10th</b> placement linearly:<br>
                    <code>10p, 9p, 8p, 7p, 6p, 5p, 4p, 3p, 2p, 1p</code>
                  </li>
                  <li class="mb-2">
                    <b>Outlier Trimming:</b> One instance of the highest and one instance of the lowest voted placement are removed from every player.<br>
                    <span class="grey--text text--lighten-1 caption">
                      Example: If a player receives point votes of <code>1-5-2-5-3-1-9-10-10-7-6</code>, one each of the <code>1p</code> and <code>10p</code> votes are removed, leaving <code>5-2-5-3-1-9-10-7-6</code>. This enhances accuracy and discourages "boosting" votes.
                    </span>
                  </li>
                  <li>
                    The remaining points are totalled up, and the player with the highest total earns the top spot.
                  </li>
                </ul>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold">
                <span><v-icon left color="amber">mdi-gavel</v-icon> Voting Rules &amp; Eligibility Criteria</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-3">
                <h4 class="mb-1">Candidate Eligibility</h4>
                <ul class="mb-3">
                  <li>Must possess the <b>Malaysian flag</b> on their osu! profile.</li>
                  <li>Must be within the <b>top 150 countrywide</b> by the end of the voting period (meeting the minimum pp threshold of the #150 Malaysian player).</li>
                  <li>Must not be inactive throughout the entirety of the voting year.</li>
                </ul>

                <h4 class="mb-1">Voter &amp; List Requirements</h4>
                <ul class="mb-3">
                  <li><b>Anyone from any country can vote!</b></li>
                  <li>Your osu! account must be created prior to the voting cutoff date (before November 1st of the voting year).</li>
                  <li>Your list must contain <b>EXACTLY 10 players</b>—no more, no less. If you wish to mention Honorable Mentions, please share them in the forum thread.</li>
                  <li>Your list <b>cannot contain yourself</b>.</li>
                </ul>

                <h4 class="mb-1">Guidelines &amp; Fair Play</h4>
                <ul class="mb-3">
                  <li>Please vote strictly based on a player's <b>performance during the current voting year</b>. Past years' achievements stay in their respective years.</li>
                  <li><b>Troll voting</b> (disregarding player skill or voting for completely inactive players) will be voided. If your list contains controversial or unpopular placements, it is advised to write a few sentences in the forum post explaining your reasoning.</li>
                  <li>You can freely change and update your votes on the website throughout the voting phase. The voting section will close automatically at the deadline.</li>
                </ul>

                <v-alert dense outlined type="info" class="mt-3 mb-0 caption">
                  We reserve the right to veto any votes that do not abide by the rules stated above. Should there be any rule changes, a notification will be sent to the osu! Malaysia Discord Server. For inquiries, please contact <b>qrizzy</b> on Discord.
                </v-alert>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-divider class="mt-6"></v-divider>
          <v-timeline dense>
            <v-timeline-item fill-dot large color="red" class="font-weight-bold">
              <template v-slot:icon>
                <v-icon class="text-h3">mdi-information</v-icon>
              </template>

              <v-row>
                <v-col>Voting timeline</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="green">
              <v-row>
                <v-col cols="12" sm="3" class="pb-0 pb-sm-3"><b>30.11.26</b></v-col>
                <v-col cols="12" sm="9" class="pt-1 pt-sm-3">Voting opens</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="yellow">
              <v-row>
                <v-col cols="12" sm="3" class="pb-0 pb-sm-3"><b>30.12.26</b></v-col>
                <v-col cols="12" sm="9" class="pt-1 pt-sm-3">Voting ends</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="grey">
              <v-row>
                <v-col cols="12" sm="3" class="pb-0 pb-sm-3"><b>31.12.26</b></v-col>
                <v-col cols="12" sm="9" class="pt-1 pt-sm-3">Video production starts if we have an editor</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="grey">
              <v-row>
                <v-col cols="12" sm="3" class="pb-0 pb-sm-3"><b>15.1.2027</b></v-col>
                <v-col cols="12" sm="9" class="pt-1 pt-sm-3">Results out and hopefully video too</v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
          <v-divider class="mb-6"></v-divider>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
