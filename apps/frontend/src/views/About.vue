<template>
  <v-row class="about">
    <v-col md="6" offset-md="3">
      <v-card>
        <v-img height="100px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-overlay class="align-end justify-start" absolute color="#000000" opacity="0.8">
            <v-card-title>About the Malaysian voting</v-card-title>
          </v-overlay>
        </v-img>

        <v-card-subtitle class="pb-0">Short summary</v-card-subtitle>
        <v-card-text class="text--primary">
          The Malaysian voting will be limited to Malaysian voters, as well as a top 1000 country limit. Everyone can vote, but in the end, the results will be calculated from people matching the criteria.
          I'll let everyone vote because it will be interesting to compare the different opinions in the end.<br><br>

          <v-divider class="mt-10"></v-divider>
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
                <v-col sm="2"><b>01.11.26</b></v-col>
                <v-col>Voting opens</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="yellow">
              <v-row>
                <v-col sm="2"><b>01.12.26</b></v-col>
                <v-col>Voting ends</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="grey">
              <v-row>
                <v-col sm="2"><b>15.12.26</b></v-col>
                <v-col>Video production starts</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="grey">
              <v-row>
                <v-col sm="2"><b>31.12.26</b></v-col>
                <v-col>Video publishing (estimated)</v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
          <v-divider class="mb-10"></v-divider>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
