<template>
  <v-row class="about">
    <v-col md="6" offset-md="3">
      <v-card>
        <v-img height="100px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-overlay class="align-end justify-start" absolute color="#000000" opacity="0.8">
            <v-card-title>This is an about page</v-card-title>
          </v-overlay>
        </v-img>

        <v-card-subtitle class="pb-0">About subtitle</v-card-subtitle>
        <v-card-text class="text--primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

          <v-divider class="mt-10"></v-divider>
          <v-timeline dense>
            <v-timeline-item>
              <v-row>
                <v-col sm="2"><b>25.09.20</b></v-col>
                <v-col>This could be a timeline of the event/page</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item>
              <v-row>
                <v-col sm="2"><b>02.10.20</b></v-col>
                <v-col>This could be a timeline of the event/page</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item>
              <v-row>
                <v-col sm="2"><b>09.10.20</b></v-col>
                <v-col>This could be a timeline of the event/page</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item>
              <v-row>
                <v-col sm="2"><b>16.10.20</b></v-col>
                <v-col>This could be a timeline of the event/page</v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
          <v-divider class="mb-10"></v-divider>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
