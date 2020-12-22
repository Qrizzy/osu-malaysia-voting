<template>
  <div class="home">
    <section>
      <v-parallax src="../assets/bg.jpg" height="800" alt="BG">
        <v-overlay absolute color="#000000" opacity="0.8">
          <h1 class="white--text mb-2 display-2 text-center text-md-left">Welcome to hallowatcher's Vue starter kit</h1>
          <div class="white--text subtitle-1 mb-3 text-center text-md-left">Backend, frontend, osu! login, etc...</div>

          <div class="text-center text-md-left">
            <v-btn large to="/about" color="primary" class="mt-3">
              Get Started
            </v-btn>
          </div>
        </v-overlay>
      </v-parallax>
    </section>

    <v-row class="my-6 mx-2 mx-md-16">
      <v-col class="text-center my-3" cols="12">
        <h2 class="headline">Here you could write a cool header so people scroll down</h2>
        <h4 class="subtitle-1">And the subtitle</h4>
      </v-col>

      <v-col class="my-3" cols="12">
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                <v-overlay class="align-end justify-start" absolute color="#000000" opacity="0.8">
                  <v-card-title>Some really cool content here</v-card-title>
                </v-overlay>
              </v-img>

              <v-card-subtitle class="pb-0">Subtitle if needed</v-card-subtitle>

              <v-card-text class="text--primary">
                Faucibus curae integer cras gravida adipiscing hendrerit id at eros a ut curabitur nisi nec leo consectetur cubilia at parturient.
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/house.jpg">
                <v-overlay class="align-end justify-start" absolute color="#000000" opacity="0.8">
                  <v-card-title>Some really cool content here</v-card-title>
                </v-overlay>
              </v-img>

              <v-card-subtitle class="pb-0">Subtitle if needed</v-card-subtitle>

              <v-card-text class="text--primary">
                Faucibus curae integer cras gravida adipiscing hendrerit id at eros a ut curabitur nisi nec leo consectetur cubilia at parturient.
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/plane.jpg">
                <v-overlay class="align-end justify-start" absolute color="#000000" opacity="0.8">
                  <v-card-title>Some really cool content here</v-card-title>
                </v-overlay>
              </v-img>

              <v-card-subtitle class="pb-0">Subtitle if needed</v-card-subtitle>

              <v-card-text class="text--primary">
                Faucibus curae integer cras gravida adipiscing hendrerit id at eros a ut curabitur nisi nec leo consectetur cubilia at parturient.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </div>
</template>

<style lang="scss">
  .home {
    margin: -12px;
  }
</style>
