<template>
  <div class="player-result-page">
    <!-- Dimmed & Blurred Profile Cover Background -->
    <div
      class="profile-cover-bg"
      :style="{ backgroundImage: `url(${player.coverUrl})` }"
    >
      <div class="profile-cover-overlay"></div>
    </div>

    <!-- PHASE 1 & 2: INTRO SEQUENCE OVERLAY -->
    <transition name="fade">
      <div v-if="showIntro" class="intro-overlay d-flex align-center justify-center">
        <!-- Skip button -->
        <v-btn
          small
          text
          class="skip-intro-btn text-none grey--text text--lighten-1"
          @click="skipIntro"
        >
          Skip Intro <v-icon small right>mdi-fast-forward</v-icon>
        </v-btn>

        <!-- Centered / shifting container -->
        <div class="intro-content-container d-flex align-center" :class="{ 'shifted-left': introStep >= 2 }">
          <!-- The Dashed Circle -->
          <div class="dashed-circle-wrap" :class="{ 'fade-in': introStep >= 0 }">
            <div class="dashed-circle-ring"></div>

            <!-- Placement Number: Visible during Step 1 and Step 2 (while centered and shifting left!) -->
            <transition name="fade">
              <span v-if="introStep >= 1 && introStep < 3" class="intro-placement-num font-weight-bold">
                {{ displayRank }}
              </span>
            </transition>

            <!-- Player Avatar: Only fades in at Step 3 (AFTER shifting left has finished) -->
            <transition name="fade">
              <img
                v-if="introStep >= 3"
                :src="player.avatarUrl"
                alt="pfp"
                class="intro-pfp"
              />
            </transition>
          </div>

          <!-- Player Name and Stats: Slides in from circle at Step 2 (remains exactly as before) -->
          <div v-if="introStep >= 2" class="intro-player-info ml-5">
            <h1 class="intro-player-name text-h3 font-weight-bold white--text d-flex align-baseline flex-wrap">
              <span>{{ player.username }}</span>
              <span
                v-if="player.globalRank"
                class="intro-global-rank text-h6 grey--text text--lighten-1 font-weight-medium ml-2"
              >
                {{ player.globalRank }}
              </span>
            </h1>
            <div class="intro-player-stats text-h5 grey--text text--lighten-1 font-weight-medium mt-1">
              {{ player.countryRank }} | {{ player.votes }}
            </div>
          </div>
        </div>

        <!-- Subtle audio unlock hint during intro when not yet interacted -->
        <transition name="fade">
          <div
            v-if="!userInteracted"
            class="intro-audio-hint caption grey--text text--lighten-1 d-flex align-center"
          >
            <v-icon x-small color="pink lighten-2" class="mr-1">mdi-volume-high</v-icon>
            Click anywhere or Skip Intro to enable audio
          </div>
        </transition>
      </div>
    </transition>

    <!-- SCREEN EDGE PLACEMENT NAVIGATION (Left: next lower rank up to #15, Right: next higher rank down to #1) -->
    <aside class="screen-edge-nav screen-edge-left" v-if="!showIntro && currentRankNum < 15">
      <button
        class="side-nav-pill side-nav-pill-left d-flex flex-column align-center justify-center"
        @click="navigatePlacement(nextLowerPlacement)"
        aria-label="Previous placement"
      >
        <span class="side-nav-rank font-weight-black">#{{ nextLowerPlacement }}</span>
        <div class="side-nav-circle d-flex align-center justify-center">
          <v-icon size="28" color="white">mdi-chevron-left</v-icon>
        </div>
      </button>
    </aside>

    <aside class="screen-edge-nav screen-edge-right" v-if="!showIntro && currentRankNum > 1">
      <button
        class="side-nav-pill side-nav-pill-right d-flex flex-column align-center justify-center"
        @click="navigatePlacement(nextHigherPlacement)"
        aria-label="Next placement"
      >
        <span class="side-nav-rank font-weight-black">#{{ nextHigherPlacement }}</span>
        <div class="side-nav-circle d-flex align-center justify-center">
          <v-icon size="28" color="white">mdi-chevron-right</v-icon>
        </div>
      </button>
    </aside>

    <!-- PHASE 3: MAIN RESULT VIEW (STORYBOARD 3 & 4) -->
    <v-container fluid class="px-2 px-sm-6 py-4 main-content-wrap" :class="{ 'intro-active': showIntro }">
      <!-- TOP BAR: Player Details (Storyboard 3 top) -->
      <div class="d-flex align-center justify-space-between flex-wrap mb-4 top-player-bar">
        <!-- Left: Dashed rank circle + square avatar + player name & global rank -->
        <div class="d-flex align-center mb-2">
          <!-- Mini spinning dashed rank circle -->
          <div class="mini-dashed-rank mr-3">
            <div class="mini-dashed-ring"></div>
            <span class="mini-rank-text font-weight-black">{{ displayRank }}</span>
          </div>

          <!-- Square Avatar -->
          <v-avatar size="52" rounded class="mr-3 elevation-4 player-avatar-square">
            <img :src="player.avatarUrl" :alt="player.username" />
          </v-avatar>

          <!-- Player Name + smaller inline Global Rank -->
          <div class="d-flex align-baseline flex-wrap">
            <h1 class="text-h4 text-sm-h3 font-weight-black white--text player-headline mb-0">
              {{ player.username }}
            </h1>
            <span
              v-if="player.globalRank"
              class="ml-2 text-subtitle-1 text-sm-h6 font-weight-bold grey--text text--lighten-1 global-rank-inline"
            >
              {{ player.globalRank }}
            </span>
          </div>
        </div>

        <!-- Right: MY#rank and Votes count -->
        <div class="text-right mb-2">
          <div class="text-h5 text-sm-h4 font-weight-bold grey--text text--lighten-2">
            {{ player.countryRank }}
          </div>
          <div class="text-subtitle-1 text-sm-h6 pink--text text--accent-2 font-weight-medium">
            {{ player.votes }}
          </div>
        </div>
      </div>

      <!-- CENTER MEDIA CAROUSEL (Storyboard 3 center) -->
      <div class="media-carousel-container position-relative my-2 d-flex align-center justify-center">
        <!-- Left Preview Clip (Clickable to switch, hidden if less than 3 replays) -->
        <div
          v-if="replays.length >= 3"
          class="side-preview-card left-preview-card hidden-xs-only d-flex align-center justify-center"
          @click="selectClip(prevClipIndex)"
          title="Click to switch to this clip"
        >
          <div class="preview-backdrop-overlay d-flex flex-column align-center justify-center px-2 text-center">
            <v-icon size="32" color="white" class="mb-1">mdi-play-circle-outline</v-icon>
            <span class="caption white--text font-weight-medium">Switch to {{ replays[prevClipIndex].title }}</span>
            <span class="text-truncate caption grey--text text--lighten-2" style="max-width: 150px;">
              {{ replays[prevClipIndex].artist }} - {{ replays[prevClipIndex].songTitle }}
            </span>
          </div>
          <video
            muted
            playsinline
            loop
            class="side-preview-video"
            :src="replays[prevClipIndex].src"
          ></video>
        </div>

        <!-- Active Center Media Player (White border / Clean frame) -->
        <div class="main-video-wrapper elevation-12">
          <video
            ref="mainVideo"
            class="main-video-element"
            playsinline
            webkit-playsinline
            preload="auto"
            :muted="isVideoMuted"
            @play="onVideoPlay"
            @pause="onVideoPause"
            @timeupdate="onVideoTimeUpdate"
            @loadedmetadata="onVideoLoadedMetadata"
            @canplay="onVideoCanPlay"
            @seeked="onVideoSeeked"
            @click="toggleVideoPlay"
            :src="activeReplay.src"
          ></video>

          <!-- Top Overlay: Current Replay & Fullscreen toggle -->
          <div class="video-top-bar d-flex align-center justify-space-between px-3 py-2">
            <v-chip small color="rgba(0,0,0,0.7)" class="white--text font-weight-bold">
              <svg
                class="osu-mode-icon mr-1"
                viewBox="0 0 16 16"
                width="14"
                height="14"
                fill="#ff66aa"
                aria-hidden="true"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 2.2a5.8 5.8 0 1 1 0 11.6A5.8 5.8 0 0 1 8 2.2zm0 2.6a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z"/>
              </svg>
              {{ activeReplay.title }}: {{ activeReplay.fullTitle }}
            </v-chip>

            <v-btn icon small class="white--text" @click="toggleFullscreen" title="Fullscreen">
              <v-icon small>{{ isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
            </v-btn>
          </div>

          <!-- Play overlay icon if paused -->
          <div v-if="!videoPlaying" class="video-center-play flex-column" @click="toggleVideoPlay">
            <v-btn fab large color="pink" dark class="elevation-8">
              <v-icon large>mdi-play</v-icon>
            </v-btn>
            <div
              v-if="videoAutoplayBlocked"
              class="mt-3 px-3 py-1 rounded-pill caption font-weight-bold white--text video-autoplay-hint"
            >
              Click anywhere to play replay &amp; commentary
            </div>
          </div>

          <!-- Video Custom Controls Bar -->
          <div class="video-bottom-controls px-3 py-2 d-flex align-center">
            <v-btn icon small class="white--text mr-2" @click="toggleVideoPlay">
              <v-icon small>{{ videoPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
            </v-btn>

            <span class="caption grey--text text--lighten-2 mr-2">
              {{ formatTime(videoCurrentTime) }} / {{ formatTime(videoDuration) }}
            </span>

            <v-slider
              v-model="videoCurrentTime"
              :max="videoDuration || 100"
              hide-details
              dense
              color="pink"
              track-color="rgba(255,255,255,0.2)"
              class="mx-2"
              @change="seekVideo"
            ></v-slider>

            <!-- Video Volume & Adjustable Slider -->
            <div class="d-flex align-center ml-2 video-volume-group">
              <v-btn icon small class="white--text" @click="toggleVideoMute" :title="isVideoMuted ? 'Unmute video' : 'Mute video'">
                <v-icon small>{{ isVideoMuted || videoVolume === 0 ? 'mdi-volume-off' : (videoVolume < 0.5 ? 'mdi-volume-medium' : 'mdi-volume-high') }}</v-icon>
              </v-btn>
              <v-slider
                v-model="videoVolume"
                :min="0"
                :max="1"
                :step="0.05"
                hide-details
                dense
                color="pink"
                track-color="rgba(255,255,255,0.2)"
                class="video-volume-slider mx-1"
                @input="onVideoVolumeChange"
              ></v-slider>
            </div>
          </div>
        </div>

        <!-- Right Preview Clip (Clickable to switch) -->
        <div
          v-if="replays.length >= 2"
          class="side-preview-card right-preview-card hidden-xs-only d-flex align-center justify-center"
          @click="selectClip(nextClipIndex)"
          title="Click to switch to this clip"
        >
          <div class="preview-backdrop-overlay d-flex flex-column align-center justify-center px-2 text-center">
            <v-icon size="32" color="white" class="mb-1">mdi-play-circle-outline</v-icon>
            <span class="caption white--text font-weight-medium">Switch to {{ replays[nextClipIndex].title }}</span>
            <span class="text-truncate caption grey--text text--lighten-2" style="max-width: 150px;">
              {{ replays[nextClipIndex].artist }} - {{ replays[nextClipIndex].songTitle }}
            </span>
          </div>
          <video
            muted
            playsinline
            loop
            class="side-preview-video"
            :src="replays[nextClipIndex].src"
          ></video>
        </div>
      </div>

      <!-- Mobile Clip Selector Pills (Visible on small screens) -->
      <div class="d-flex d-sm-none justify-center flex-wrap my-2">
        <v-btn
          v-for="(r, idx) in replays"
          :key="r.id"
          x-small
          rounded
          :color="idx === activeClipIndex ? 'pink' : 'grey darken-3'"
          class="mx-1 my-1 text-none"
          @click="selectClip(idx)"
        >
          <v-icon left x-small>{{ idx === activeClipIndex ? 'mdi-play' : 'mdi-video' }}</v-icon>
          {{ r.title }}
        </v-btn>
      </div>

      <!-- COMMENTATOR & SCRIPT SECTION (Storyboard 3 & User Suggestion Image 3) -->
      <div class="commentator-section my-3 px-1">
        <!-- Top Row: Mic Button + Commentator Name + Audio Seekbar + Volume Slider (Image 3) -->
        <div class="d-flex align-center flex-wrap commentator-audio-bar mb-2 px-3 py-2 elevation-2">
          <!-- Mic Play/Pause Toggle -->
          <v-btn
            fab
            x-small
            :color="commentaryPlaying ? 'pink' : 'grey darken-3'"
            class="white--text mr-3 mic-toggle-btn elevation-3 flex-shrink-0"
            @click="toggleCommentary"
            :title="commentaryPlaying ? 'Pause commentary' : 'Play commentary'"
          >
            <v-icon small>{{ commentaryPlaying ? 'mdi-microphone' : 'mdi-microphone-off' }}</v-icon>
          </v-btn>

          <!-- Commentator Name -->
          <div class="mr-4 commentator-name-wrap flex-shrink-0">
            <div class="caption grey--text font-weight-bold text-uppercase" style="font-size: 0.68rem; letter-spacing: 0.8px; line-height: 1;">
              Commentator
            </div>
            <div class="subtitle-2 font-weight-bold white--text d-flex align-center" @click="toggleCommentary" style="cursor: pointer;">
              {{ commentatorName }}
              <v-chip x-small color="pink" class="ml-2 font-weight-bold" v-if="commentaryPlaying" style="height: 16px; font-size: 0.65rem;">
                Speaking
              </v-chip>
            </div>
          </div>

          <!-- Audio Seekbar (scrubber across middle, matching Image 3) -->
          <div class="d-flex align-center flex-grow-1 mx-2 commentary-seekbar-group">
            <span class="caption grey--text text--lighten-1 mr-2" style="font-size: 0.72rem; min-width: 30px;">
              {{ formatTime(commentaryTime) }}
            </span>
            <v-slider
              v-model="commentaryTime"
              :max="commentaryDuration || 51"
              hide-details
              dense
              color="pink"
              track-color="rgba(255,255,255,0.2)"
              class="commentary-seek-slider my-0"
              @change="seekCommentary"
            ></v-slider>
            <span class="caption grey--text text--lighten-1 ml-2" style="font-size: 0.72rem; min-width: 30px;">
              {{ formatTime(commentaryDuration) }}
            </span>
          </div>

          <!-- Volume Controls at Right End (Arrow in Image 3) -->
          <div class="d-flex align-center ml-2 commentary-volume-inline flex-shrink-0">
            <v-btn
              icon
              x-small
              class="white--text mr-1"
              @click="toggleCommentaryMute"
              :title="isCommentaryMuted ? 'Unmute commentator' : 'Mute commentator'"
            >
              <v-icon small>{{ isCommentaryMuted || commentaryVolume === 0 ? 'mdi-volume-off' : (commentaryVolume < 0.5 ? 'mdi-volume-medium' : 'mdi-volume-high') }}</v-icon>
            </v-btn>
            <v-slider
              v-model="commentaryVolume"
              :min="0"
              :max="1"
              :step="0.05"
              hide-details
              dense
              color="pink"
              track-color="rgba(255,255,255,0.2)"
              class="commentary-volume-slider mx-1"
              @input="onCommentaryVolumeChange"
            ></v-slider>
            <span class="caption grey--text ml-1" style="font-size: 0.72rem; min-width: 30px;">
              {{ Math.round(commentaryVolume * 100) }}%
            </span>
          </div>
        </div>

        <!-- Scrollable Script Box -->
        <div class="script-scroll-box elevation-2 pa-3">
          <div class="script-scroll-content">
            <p
              v-for="(para, pIdx) in scriptParagraphs"
              :key="'p-' + pIdx"
              class="body-2 grey--text text--lighten-3 mb-2 script-line"
            >
              {{ para }}
            </p>
          </div>
        </div>
      </div>

      <!-- MAP & SKIN LINKS (Storyboard 3 bottom buttons) -->
      <div class="d-flex flex-wrap align-center justify-center my-4 button-pills-row">
        <v-btn
          v-for="(r, idx) in replays"
          :key="'map-' + idx"
          rounded
          outlined
          :color="activeClipIndex === idx ? 'pink' : 'white'"
          class="mx-2 my-1 text-none font-weight-bold beatmap-link-btn"
          :href="r.mapUrl"
          target="_blank"
          rel="noopener noreferrer"
          :title="r.fullTitle"
        >
          <!-- osu! mode icon from beatmapset panel (fa-extra-mode-osu) -->
          <svg
            class="osu-mode-icon mr-2"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 2.2a5.8 5.8 0 1 1 0 11.6A5.8 5.8 0 0 1 8 2.2zm0 2.6a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z"/>
          </svg>
          {{ r.artist }} - {{ r.songTitle }}
        </v-btn>

        <v-btn
          rounded
          outlined
          color="#ff66aa"
          class="mx-2 my-1 text-none font-weight-bold"
          :href="skinLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-icon left small>mdi-palette</v-icon>
          Skin link
        </v-btn>
      </div>

      <!-- 2026 TOP PP PLAYS CARD GRID -->
      <div v-if="topPlays2026.length > 0" class="top-plays-section my-5">
        <div class="d-flex align-center justify-space-between mb-2 px-1">
          <span class="caption font-weight-bold text-uppercase grey--text text--lighten-1" style="letter-spacing: 0.9px;">
            Top PP Plays in 2026
          </span>
          <span class="caption grey--text">2026 Snapshot</span>
        </div>

        <v-row dense>
          <v-col
            cols="12"
            sm="4"
            v-for="(play, pIdx) in topPlays2026"
            :key="'top-play-' + pIdx"
          >
            <a
              :href="play.mapUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="top-play-card d-flex flex-column justify-space-between pa-3 text-decoration-none"
              :title="`${play.artist} - ${play.title} [${play.difficulty}]`"
            >
              <!-- 60% Blurred & 20% Dimmed Map Cover Background -->
              <div
                class="top-play-card-bg"
                :style="{ backgroundImage: `url(${play.coverUrl})` }"
              ></div>
              <div class="top-play-card-overlay"></div>

              <!-- Foreground Content -->
              <div class="top-play-card-content d-flex align-start justify-space-between">
                <div class="top-play-title-wrap pr-2">
                  <div class="subtitle-2 font-weight-bold white--text text-truncate">
                    {{ play.artist }} - {{ play.title }}
                  </div>
                  <div class="caption grey--text text--lighten-2 text-truncate">
                    [{{ play.difficulty }}]
                  </div>
                </div>
                <span :class="['play-grade-badge', gradeBadgeClass(play.grade)]">
                  {{ play.grade }}
                </span>
              </div>

              <div class="top-play-card-content d-flex align-center justify-space-between pt-2 mt-2 top-play-footer">
                <div class="d-flex align-center flex-wrap" style="gap: 4px;">
                  <span
                    v-for="(mod, mIdx) in play.mods"
                    :key="'mod-' + pIdx + '-' + mIdx"
                    :class="['play-mod-badge', modBadgeClass(mod)]"
                  >
                    {{ mod }}
                  </span>
                  <span class="caption white--text font-weight-medium ml-1">
                    {{ play.accuracy }}
                  </span>
                  <span v-if="play.date" class="caption grey--text text--lighten-2 ml-1">
                    • {{ play.date }}
                  </span>
                </div>

                <span class="play-pp-badge font-weight-black">
                  {{ play.pp }}pp
                </span>
              </div>
            </a>
          </v-col>
        </v-row>
      </div>

      <!-- VOTER'S REMARKS (Storyboard 3 -> 4 & Clean Hover Peeking) -->
      <div
        class="remarks-interactive-area my-6"
        @mouseenter="isHoveringRemarks = true"
        @mouseleave="isHoveringRemarks = false"
      >
        <!-- Interactive Divider Bar: Solid line on both sides, clean text in middle (NO badge/pill, NO dashes '---') -->
        <div
          ref="remarksDivider"
          class="remarks-divider-bar d-flex align-center justify-center"
          @click="toggleRemarksView"
        >
          <div class="divider-line flex-grow-1"></div>

          <span class="remarks-divider-text font-weight-bold white--text mx-4 subtitle-2">
            {{ showRemarks ? "Hide Voter's Remarks" : "View Voter's Remarks" }}
          </span>

          <div class="divider-line flex-grow-1"></div>
        </div>

        <!-- COLLAPSED / PEEKING STATE: Smoothly reveals below divider when hovered before clicking -->
        <v-expand-transition>
          <div
            v-if="!showRemarks && isHoveringRemarks && voterRemarks.length > 0"
            class="remarks-peeking-container mt-3"
            @click="expandRemarks"
          >
            <div class="remarks-peeking-card pa-4 elevation-3 d-flex align-start">
              <v-avatar size="48" rounded class="mr-3 elevation-2 flex-shrink-0">
                <img :src="voterRemarks[0].avatarUrl" :alt="voterRemarks[0].username" />
              </v-avatar>

              <div class="remark-text-block flex-grow-1">
                <div class="d-flex align-center flex-wrap">
                  <span class="font-weight-bold white--text subtitle-2">
                    {{ voterRemarks[0].username }}
                  </span>
                  <span class="mx-2 grey--text text--lighten-1">•</span>
                  <span class="pink--text text--lighten-2 font-weight-medium caption text-sm-body-2">
                    Voted #{{ voterRemarks[0].ranking }}
                  </span>
                </div>

                <p class="body-2 grey--text text--lighten-2 mt-1 mb-2 remark-body-text">
                  {{ voterRemarks[0].remarks }}
                </p>

                <div class="text-right">
                  <span class="caption pink--text text--lighten-3 font-weight-bold">
                    Click to view all {{ voterRemarks.length }} remarks <v-icon x-small color="pink lighten-3">mdi-chevron-down</v-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </v-expand-transition>

        <!-- FULL VOTER REMARKS LIST (Storyboard 4) -->
        <v-expand-transition>
          <div v-show="showRemarks" class="voter-remarks-expanded mt-4">
            <v-row>
              <v-col
                cols="12"
                md="6"
                v-for="remark in voterRemarks"
                :key="remark.id"
              >
                <v-card class="remark-card pa-4 elevation-3 d-flex align-start">
                  <!-- Rounded square avatar -->
                  <v-avatar size="48" rounded class="mr-3 elevation-2 flex-shrink-0">
                    <img :src="remark.avatarUrl" :alt="remark.username" />
                  </v-avatar>

                  <div class="remark-text-block flex-grow-1">
                    <div class="d-flex align-center flex-wrap">
                      <span class="font-weight-bold white--text subtitle-2">
                        {{ remark.username }}
                      </span>
                      <span class="mx-2 grey--text text--lighten-1">•</span>
                      <span class="pink--text text--lighten-2 font-weight-medium caption text-sm-body-2">
                        Voted #{{ remark.ranking }}
                      </span>
                    </div>

                    <p class="body-2 grey--text text--lighten-2 mt-2 mb-0 remark-body-text">
                      {{ remark.remarks }}
                    </p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </div>

      <!-- Hidden Commentary Audio Element -->
      <audio
        ref="commentaryAudio"
        preload="auto"
        :src="commentaryAudioSrc"
        @play="onCommentaryPlay"
        @pause="onCommentaryPause"
        @timeupdate="onCommentaryTimeUpdate"
        @ended="onCommentaryEnded"
      ></audio>
    </v-container>

    <!-- AUTOPLAY BLOCKED FLOATING PROMPT (Chrome Incognito / LibreWolf) -->
    <transition name="fade">
      <button
        v-if="!showIntro && (videoAutoplayBlocked || audioAutoplayBlocked)"
        type="button"
        class="autoplay-unlock-banner d-flex align-center px-4 py-2 elevation-8"
        @click.stop="unlockAllMediaFromGesture"
      >
        <v-icon small color="pink accent-2" class="mr-2">
          {{ videoAutoplayBlocked ? 'mdi-play-circle' : 'mdi-volume-off' }}
        </v-icon>
        <span class="caption text-sm-body-2 font-weight-medium white--text">
          {{
            videoAutoplayBlocked
              ? 'Autoplay blocked by browser — Click anywhere to start replay & commentary'
              : 'Audio muted by browser — Click anywhere to unmute & start commentary'
          }}
        </span>
      </button>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import {
    getPlayerResult2026,
    PlayerResultEntry,
    ReplayClip,
    TopPlayItem,
    VoterRemarkItem
  } from '../data/results2026';

  @Component
  export default class PlayerResult extends Vue {
    // Intro sequence state
    showIntro = true;
    introStep = 0; // 0: circle, 1: number, 2: slide_left & pfp reveal
    introTimers: number[] = [];

    // Media & Replays state
    activeClipIndex = 0;
    videoPlaying = false;
    videoCurrentTime = 0;
    videoDuration = 0;
    videoVolume = 0.3;
    isVideoMuted = false;
    previousVideoVolume = 0.3;
    isFullscreen = false;
    initialStartApplied = false;
    shouldBePlaying = false;
    isSeeking = false;

    // Commentary audio state
    commentaryPlaying = false;
    commentaryStartedOnce = false;
    commentaryTime = 0;
    commentaryDuration = 51.15;
    commentaryVolume = 1.0;
    isCommentaryMuted = false;
    previousCommentaryVolume = 1.0;

    // Autoplay & user gesture state
    userInteracted = false;
    videoAutoplayBlocked = false;
    audioAutoplayBlocked = false;
    userManuallyMutedVideo = false;
    userManuallyPausedVideo = false;
    userManuallyPausedCommentary = false;
    userGestureListener: (() => void) | null = null;

    // Remarks interaction state
    showRemarks = false;
    isHoveringRemarks = false;

    get currentRankNum(): number {
      const r = parseInt(this.$route.params.rank, 10);
      if (isNaN(r)) return 7;
      return Math.min(15, Math.max(1, r));
    }

    get resultEntry(): PlayerResultEntry {
      return getPlayerResult2026(this.currentRankNum);
    }

    get player() {
      return {
        id: this.resultEntry.id,
        username: this.resultEntry.username,
        avatarUrl: this.resultEntry.avatarUrl,
        coverUrl: this.resultEntry.coverUrl,
        globalRank: this.resultEntry.globalRank,
        countryRank: this.resultEntry.countryRank,
        votes: this.resultEntry.votes
      };
    }

    get commentatorName(): string {
      return this.resultEntry.commentatorName;
    }

    get commentaryAudioSrc(): string {
      return this.resultEntry.commentaryAudioSrc;
    }

    get replays(): ReplayClip[] {
      return this.resultEntry.replays;
    }

    get skinLink(): string {
      return this.resultEntry.skinLink;
    }

    get scriptParagraphs(): string[] {
      return this.resultEntry.scriptParagraphs;
    }

    get topPlays2026(): TopPlayItem[] {
      return this.resultEntry.topPlays2026;
    }

    get voterRemarks(): VoterRemarkItem[] {
      return this.resultEntry.voterRemarks;
    }

    get displayRank(): string {
      return String(this.currentRankNum);
    }

    get nextLowerPlacement(): number {
      // "<" button goes toward #15 (e.g. #8 when viewing #7)
      return Math.min(15, this.currentRankNum + 1);
    }

    get nextHigherPlacement(): number {
      // ">" button goes toward #1 (e.g. #6 when viewing #7)
      return Math.max(1, this.currentRankNum - 1);
    }

    gradeBadgeClass(grade: string): string {
      const g = (grade || '').toUpperCase();
      if (g === 'XH' || g === 'SH') return 'grade-silver';
      if (g === 'X' || g === 'S') return 'grade-gold';
      return 'grade-green';
    }

    modBadgeClass(mod: string): string {
      const m = (mod || '').toUpperCase();
      if (m === 'HD') return 'mod-hd';
      if (m === 'DT' || m === 'NC') return 'mod-dt';
      if (m === 'HR') return 'mod-hr';
      if (m === 'EZ' || m === 'FL') return 'mod-ez';
      return 'mod-default';
    }

    get activeReplay(): ReplayClip {
      return this.replays[this.activeClipIndex] || this.replays[0];
    }

    get prevClipIndex(): number {
      return (this.activeClipIndex - 1 + this.replays.length) % this.replays.length;
    }

    get nextClipIndex(): number {
      return (this.activeClipIndex + 1) % this.replays.length;
    }

    @Watch('$route')
    onRouteChange() {
      this.clearIntroTimers();
      this.pauseAllMedia();
      this.activeClipIndex = 0;
      this.showIntro = true;
      this.introStep = 0;
      const video = this.$refs.mainVideo as HTMLVideoElement;
      this.videoDuration = video && !isNaN(video.duration) ? video.duration : 0;
      this.videoCurrentTime = 0;
      this.commentaryTime = 0;
      this.commentaryStartedOnce = false;
      this.initialStartApplied = false;
      this.videoAutoplayBlocked = false;
      this.audioAutoplayBlocked = false;
      this.userManuallyMutedVideo = false;
      this.userManuallyPausedVideo = false;
      this.userManuallyPausedCommentary = false;
      this.runIntroSequence();
    }

    mounted() {
      const userActivation = (navigator as unknown as { userActivation?: { hasBeenActive: boolean } }).userActivation;
      if (userActivation && userActivation.hasBeenActive) {
        this.userInteracted = true;
      }
      this.runIntroSequence();
    }

    beforeDestroy() {
      this.clearIntroTimers();
      this.pauseAllMedia();
      this.removeUserGestureListener();
    }

    clearIntroTimers() {
      this.introTimers.forEach((id) => window.clearTimeout(id));
      this.introTimers = [];
    }

    runIntroSequence() {
      this.clearIntroTimers();
      this.showIntro = true;
      this.introStep = 0; // 0s: circle ring fades in
      this.initialStartApplied = false;
      this.setupUserGestureUnlock();

      // 0.9s: placement number fades in inside centered circle
      this.introTimers.push(
        window.setTimeout(() => {
          if (!this.showIntro) return;
          this.introStep = 1;
        }, 900)
      );

      // 1.9s: circle shifts left with placement number still inside, video starts immediately
      this.introTimers.push(
        window.setTimeout(() => {
          if (!this.showIntro) return;
          this.introStep = 2; // triggers container shift to left
          this.startVideoAtClipStart(false);
        }, 1900)
      );

      // 2.8s: AFTER shift finishes, placement number switches to player pfp and name/stats slide in
      this.introTimers.push(
        window.setTimeout(() => {
          if (!this.showIntro) return;
          this.introStep = 3;
        }, 2800)
      );

      // 4.9s: overlay fades out smoothly, revealing full interactive view
      this.introTimers.push(
        window.setTimeout(() => {
          if (!this.showIntro) return;
          this.showIntro = false;
          this.onMainSiteRevealed();
        }, 4900)
      );
    }

    skipIntro() {
      this.clearIntroTimers();
      this.userInteracted = true;
      this.showIntro = false;
      this.userManuallyPausedVideo = false;
      this.userManuallyPausedCommentary = false;
      this.videoVolume = 0.3;
      this.previousVideoVolume = 0.3;
      if (!this.userManuallyMutedVideo) {
        this.isVideoMuted = false;
      }
      this.startVideoAtClipStart(true);
      this.startCommentaryPlayback(true);
    }

    applyClipStartTime(video: HTMLVideoElement) {
      if (this.initialStartApplied) return;
      if (!isNaN(video.duration) && video.duration > 0) {
        this.initialStartApplied = true;
        const target = this.activeReplay.startTime;
        if (target > 0 && Math.abs(video.currentTime - target) > 1.0) {
          this.isSeeking = true;
          video.currentTime = target;
        }
      }
    }

    startVideoAtClipStart(fromUserGesture = false) {
      this.shouldBePlaying = true;
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (!video) return;
      this.applyClipStartTime(video);
      this.attemptPlayVideo(fromUserGesture);
    }

    attemptPlayVideo(fromUserGesture = false) {
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (!video) return;
      this.shouldBePlaying = true;

      // Only defer automatic playback while actively seeking; never drop a user-initiated play!
      if (this.isSeeking && !fromUserGesture && !this.userInteracted) return;

      this.applyClipStartTime(video);

      if (fromUserGesture && !this.userManuallyMutedVideo) {
        this.isVideoMuted = false;
      }

      video.volume = this.videoVolume;
      video.muted = this.isVideoMuted;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.videoPlaying = true;
            this.videoAutoplayBlocked = false;
            this.maybeCleanupGestureListener();
          })
          .catch(() => {
            if (this.isVideoMuted) {
              // Even muted playback is blocked (e.g. LibreWolf strict policy)
              this.videoPlaying = false;
              this.videoAutoplayBlocked = true;
              this.audioAutoplayBlocked = true;
              this.setupUserGestureUnlock();
              return;
            }

            // Unmuted autoplay blocked (e.g. Chrome Incognito): try muted autoplay fallback
            this.audioAutoplayBlocked = true;
            video.muted = true;
            const mutedPromise = video.play();
            if (mutedPromise !== undefined) {
              mutedPromise
                .then(() => {
                  // Muted autoplay succeeded (Chrome Incognito)
                  this.isVideoMuted = true;
                  this.videoPlaying = true;
                  this.videoAutoplayBlocked = false;
                  this.setupUserGestureUnlock();
                })
                .catch(() => {
                  // Muted autoplay also blocked (LibreWolf) - restore unmuted preference for first click
                  video.muted = this.userManuallyMutedVideo;
                  this.isVideoMuted = this.userManuallyMutedVideo;
                  this.videoPlaying = false;
                  this.videoAutoplayBlocked = true;
                  this.setupUserGestureUnlock();
                });
            }
          });
      }
    }

    startCommentaryPlayback(fromUserGesture = false) {
      const audio = this.$refs.commentaryAudio as HTMLAudioElement;
      if (!audio) return;

      if (!this.commentaryStartedOnce) {
        audio.currentTime = 0;
        this.commentaryStartedOnce = true;
      }

      if (fromUserGesture) {
        this.userManuallyPausedCommentary = false;
      }

      audio.volume = this.commentaryVolume;
      audio.muted = this.isCommentaryMuted;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.commentaryPlaying = true;
            this.audioAutoplayBlocked = false;
            this.maybeCleanupGestureListener();
          })
          .catch(() => {
            this.commentaryPlaying = false;
            this.audioAutoplayBlocked = true;
            this.setupUserGestureUnlock();
          });
      }
    }

    onMainSiteRevealed() {
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (video) {
        // Duck video volume slightly for commentator audio
        this.videoVolume = 0.3;
        this.previousVideoVolume = 0.3;
        video.volume = 0.3;
        if (!this.userManuallyPausedVideo && video.paused) {
          this.attemptPlayVideo(false);
        }
      }

      if (!this.userManuallyPausedCommentary) {
        this.startCommentaryPlayback(false);
      }
    }

    setupUserGestureUnlock() {
      if (this.userGestureListener) return;
      this.userGestureListener = () => {
        this.unlockAllMediaFromGesture();
      };
      window.addEventListener('click', this.userGestureListener);
      window.addEventListener('keydown', this.userGestureListener);
      window.addEventListener('touchend', this.userGestureListener);
    }

    unlockAllMediaFromGesture() {
      const audio = this.$refs.commentaryAudio as HTMLAudioElement;
      const video = this.$refs.mainVideo as HTMLVideoElement;
      this.userInteracted = true;

      if (this.showIntro) {
        // User clicked during the intro: silently prime audio and video so they unmute & play cleanly
        if (audio && audio.paused && !this.userManuallyPausedCommentary) {
          const wasMuted = audio.muted;
          audio.muted = true;
          const p = audio.play();
          if (p !== undefined) {
            p.then(() => {
              if (this.showIntro) {
                audio.pause();
                audio.currentTime = 0;
              }
              audio.muted = this.isCommentaryMuted || wasMuted;
              this.audioAutoplayBlocked = false;
            }).catch(() => {});
          }
        }

        if (video) {
          if (this.introStep >= 2) {
            if (!this.userManuallyMutedVideo) {
              this.isVideoMuted = false;
              video.muted = false;
              video.volume = this.videoVolume;
            }
            if (video.paused && !this.userManuallyPausedVideo) {
              this.attemptPlayVideo(true);
            }
          } else if (video.paused) {
            const wasMuted = video.muted;
            video.muted = true;
            const vp = video.play();
            if (vp !== undefined) {
              vp.then(() => {
                if (this.showIntro && this.introStep < 2) {
                  video.pause();
                }
                video.muted = this.isVideoMuted || wasMuted;
                this.videoAutoplayBlocked = false;
              }).catch(() => {});
            }
          }
        }
        return;
      }

      // Main page is already revealed: unmute video & start any browser-blocked media synchronously
      if (video) {
        if (!this.userManuallyMutedVideo && this.isVideoMuted) {
          this.isVideoMuted = false;
          video.muted = false;
          this.videoVolume = this.previousVideoVolume || 0.3;
          video.volume = this.videoVolume;
        }
        if (video.paused && !this.userManuallyPausedVideo && (this.shouldBePlaying || this.videoAutoplayBlocked)) {
          this.attemptPlayVideo(true);
        } else {
          this.videoAutoplayBlocked = false;
        }
      }

      if (audio) {
        if (audio.paused && !this.userManuallyPausedCommentary && this.audioAutoplayBlocked) {
          this.startCommentaryPlayback(true);
        } else if (!audio.paused) {
          this.audioAutoplayBlocked = false;
        }
      }

      this.maybeCleanupGestureListener();
    }

    maybeCleanupGestureListener() {
      if (!this.showIntro && this.userInteracted && !this.videoAutoplayBlocked && !this.audioAutoplayBlocked) {
        this.removeUserGestureListener();
      }
    }

    removeUserGestureListener() {
      if (this.userGestureListener) {
        window.removeEventListener('click', this.userGestureListener);
        window.removeEventListener('keydown', this.userGestureListener);
        window.removeEventListener('touchend', this.userGestureListener);
        this.userGestureListener = null;
      }
    }

    onVideoPlay() {
      this.videoPlaying = true;
      this.isSeeking = false;
      this.videoAutoplayBlocked = false;
    }

    onVideoPause() {
      this.videoPlaying = false;
    }

    onVideoCanPlay() {
      if (
        this.shouldBePlaying &&
        !this.videoPlaying &&
        !this.isSeeking &&
        !this.videoAutoplayBlocked &&
        !this.userManuallyPausedVideo
      ) {
        this.attemptPlayVideo(this.userInteracted);
      }
    }

    onVideoSeeked() {
      this.isSeeking = false;
      if (this.shouldBePlaying && !this.userManuallyPausedVideo) {
        const video = this.$refs.mainVideo as HTMLVideoElement;
        if (video && video.paused) {
          this.attemptPlayVideo(this.userInteracted);
        }
      }
    }

    onVideoLoadedMetadata() {
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (!video) return;
      this.videoDuration = video.duration;
      this.applyClipStartTime(video);
      if (this.shouldBePlaying && !this.userManuallyPausedVideo && video.paused) {
        this.attemptPlayVideo(this.userInteracted);
      }
    }

    selectClip(index: number) {
      if (index === this.activeClipIndex) return;
      this.userInteracted = true;
      this.userManuallyPausedVideo = false;
      this.activeClipIndex = index;
      this.shouldBePlaying = true;
      this.initialStartApplied = false;
      this.isSeeking = false;
      this.videoDuration = 0;
      this.videoCurrentTime = 0;

      if (!this.userManuallyMutedVideo) {
        this.isVideoMuted = false;
      }

      this.$nextTick(() => {
        const video = this.$refs.mainVideo as HTMLVideoElement;
        if (!video) return;
        video.muted = this.isVideoMuted;
        video.volume = this.videoVolume;
        video.load();
        video.play()
          .then(() => {
            this.videoPlaying = true;
            this.videoAutoplayBlocked = false;
          })
          .catch(() => {});
      });
    }

    toggleVideoPlay() {
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (!video) return;

      // If browser muted autoplay was active and user clicks video for the first time,
      // unmute & let global gesture handler start commentary instead of pausing the video!
      if (!this.userInteracted && this.audioAutoplayBlocked && this.isVideoMuted && !this.userManuallyMutedVideo && !video.paused) {
        this.isVideoMuted = false;
        video.muted = false;
        this.videoVolume = this.previousVideoVolume || 0.3;
        video.volume = this.videoVolume;
        return;
      }

      this.userInteracted = true;
      if (video.paused) {
        this.shouldBePlaying = true;
        this.userManuallyPausedVideo = false;
        this.attemptPlayVideo(true);
      } else {
        this.shouldBePlaying = false;
        this.userManuallyPausedVideo = true;
        video.pause();
        this.videoPlaying = false;
      }
    }

    seekVideo(val: number) {
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (video) {
        this.isSeeking = true;
        video.currentTime = val;
      }
    }

    onVideoVolumeChange(val: number) {
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (video) {
        video.volume = val;
        this.videoVolume = val;
        if (val > 0) {
          this.previousVideoVolume = val;
          if (this.isVideoMuted) {
            video.muted = false;
            this.isVideoMuted = false;
            this.userManuallyMutedVideo = false;
          }
        }
      }
    }

    toggleVideoMute() {
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (!video) return;
      this.userInteracted = true;
      if (this.isVideoMuted || this.videoVolume === 0) {
        this.isVideoMuted = false;
        this.userManuallyMutedVideo = false;
        video.muted = false;
        this.videoVolume = this.previousVideoVolume || 0.3;
        video.volume = this.videoVolume;
      } else {
        if (this.videoVolume > 0) {
          this.previousVideoVolume = this.videoVolume;
        }
        this.isVideoMuted = true;
        this.userManuallyMutedVideo = true;
        video.muted = true;
      }
    }

    onCommentaryVolumeChange(val: number) {
      const audio = this.$refs.commentaryAudio as HTMLAudioElement;
      if (audio) {
        audio.volume = val;
        this.commentaryVolume = val;
        if (val > 0 && this.isCommentaryMuted) {
          audio.muted = false;
          this.isCommentaryMuted = false;
        }
      }
    }

    toggleCommentaryMute() {
      const audio = this.$refs.commentaryAudio as HTMLAudioElement;
      if (!audio) return;
      if (this.isCommentaryMuted || this.commentaryVolume === 0) {
        this.isCommentaryMuted = false;
        audio.muted = false;
        this.commentaryVolume = this.previousCommentaryVolume || 1.0;
        audio.volume = this.commentaryVolume;
      } else {
        this.previousCommentaryVolume = this.commentaryVolume;
        this.isCommentaryMuted = true;
        audio.muted = true;
      }
    }

    toggleFullscreen() {
      const videoWrapper = this.$el.querySelector('.main-video-wrapper') as HTMLElement;
      if (!videoWrapper) return;

      if (!document.fullscreenElement) {
        videoWrapper.requestFullscreen().then(() => {
          this.isFullscreen = true;
        }).catch(() => {});
      } else {
        document.exitFullscreen().then(() => {
          this.isFullscreen = false;
        }).catch(() => {});
      }
    }

    toggleCommentary() {
      const audio = this.$refs.commentaryAudio as HTMLAudioElement;
      if (!audio) return;
      this.userInteracted = true;
      if (audio.paused) {
        this.startCommentaryPlayback(true);
      } else {
        this.userManuallyPausedCommentary = true;
        audio.pause();
        this.commentaryPlaying = false;
      }
    }

    seekCommentary(val: number) {
      const audio = this.$refs.commentaryAudio as HTMLAudioElement;
      if (audio) {
        audio.currentTime = val;
      }
    }

    onVideoTimeUpdate() {
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (video) {
        this.videoCurrentTime = video.currentTime;
        this.isSeeking = false;
      }
    }

    onCommentaryPlay() {
      this.commentaryPlaying = true;
      this.audioAutoplayBlocked = false;
    }

    onCommentaryPause() {
      this.commentaryPlaying = false;
    }

    onCommentaryTimeUpdate() {
      const audio = this.$refs.commentaryAudio as HTMLAudioElement;
      if (audio) {
        this.commentaryTime = audio.currentTime;
        if (audio.duration) {
          this.commentaryDuration = audio.duration;
        }
      }
    }

    onCommentaryEnded() {
      this.commentaryPlaying = false;
    }

    expandRemarks() {
      this.showRemarks = true;
      this.scrollToRemarks();
    }

    collapseRemarks() {
      this.showRemarks = false;
    }

    toggleRemarksView() {
      this.showRemarks = !this.showRemarks;
      if (this.showRemarks) {
        this.scrollToRemarks();
      }
    }

    scrollToRemarks() {
      this.$nextTick(() => {
        const divider = this.$refs.remarksDivider as HTMLElement;
        if (divider) {
          const rect = divider.getBoundingClientRect();
          const targetTop = rect.top + window.pageYOffset - 60;
          window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        }
      });
    }

    navigatePlacement(rank: number) {
      this.userInteracted = true;
      const year = this.$route.params.year || '2026';
      this.$router.push(`/${year}/${rank}`).catch(() => {});
    }

    pauseAllMedia() {
      const video = this.$refs.mainVideo as HTMLVideoElement;
      if (video) video.pause();
      const audio = this.$refs.commentaryAudio as HTMLAudioElement;
      if (audio) audio.pause();
    }

    formatTime(sec: number): string {
      if (!sec || isNaN(sec)) return '0:00';
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }
  }
</script>

<style lang="scss" scoped>
.player-result-page {
  position: relative;
  min-height: calc(100vh - 120px);
  color: #fff;
  background-color: #121212;
  overflow-x: hidden;
}

/* BLURRED & DIMMED PROFILE COVER BACKDROP */
.profile-cover-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(6px) brightness(0.65);
  transform: scale(1.04); /* prevents blur vignette clipping */
  z-index: 0;
  pointer-events: none;
}

.profile-cover-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(18, 18, 24, 0.22) 0%, rgba(13, 13, 17, 0.58) 100%);
}

/* INTRO SEQUENCE STYLING */
.intro-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0d0d11;
  z-index: 1000;
}

.skip-intro-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1010;
}

.intro-audio-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 102, 170, 0.3);
  border-radius: 999px;
  padding: 6px 14px;
  pointer-events: none;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.intro-content-container {
  position: relative;
  transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.intro-content-container.shifted-left {
  transform: translateX(-140px);
}

@media (max-width: 600px) {
  .intro-content-container.shifted-left {
    transform: translateX(-80px);
  }
}

.dashed-circle-wrap {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.dashed-circle-wrap.fade-in {
  opacity: 1;
}

.dashed-circle-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 4px dashed #ff66aa;
  animation: spin 10s linear infinite;
}

.intro-placement-num {
  position: absolute;
  font-size: 3.5rem;
  color: #fff;
  z-index: 2;
  user-select: none;
}

.intro-pfp {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 2;
}

.intro-player-info {
  animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

/* MAIN CONTENT */
.main-content-wrap {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  transition: opacity 0.6s ease;
}

.main-content-wrap.intro-active {
  opacity: 0;
  pointer-events: none;
}

/* TOP BAR */
.mini-dashed-rank {
  position: relative;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-dashed-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px dashed #ff66aa;
  animation: spin 12s linear infinite;
}

.mini-rank-text {
  font-size: 1.4rem;
  color: #fff;
  z-index: 1;
}

.player-avatar-square {
  border: 2px solid rgba(255, 102, 170, 0.5);
}

/* SCREEN EDGE PLACEMENT NAVIGATION (MOST LEFT & MOST RIGHT) */
.screen-edge-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  pointer-events: auto;
}

.screen-edge-left {
  left: 20px;
}

.screen-edge-right {
  right: 20px;
}

.side-nav-pill {
  background: rgba(22, 20, 28, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 102, 170, 0.45);
  border-radius: 30px;
  padding: 10px 8px;
  cursor: pointer;
  outline: none;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.side-nav-pill:hover {
  background: rgba(36, 26, 42, 0.95);
  border-color: #ff66aa;
  box-shadow: 0 0 24px rgba(255, 102, 170, 0.6);
  transform: scale(1.12);
}

.side-nav-rank {
  font-size: 0.78rem;
  font-weight: 800;
  color: #ff80bf;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  line-height: 1;
}

.side-nav-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ff66aa;
  box-shadow: 0 2px 10px rgba(255, 102, 170, 0.45);
  transition: all 0.2s ease;
}

.side-nav-pill:hover .side-nav-circle {
  background: #ff3388;
  box-shadow: 0 0 16px rgba(255, 102, 170, 0.9);
}

@media (max-width: 600px) {
  .screen-edge-left {
    left: 8px;
  }
  .screen-edge-right {
    right: 8px;
  }
  .side-nav-pill {
    padding: 8px 6px;
    border-radius: 24px;
  }
  .side-nav-circle {
    width: 36px;
    height: 36px;
  }
}

/* MEDIA CAROUSEL */
.media-carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
}

.main-video-wrapper {
  position: relative;
  width: 65%;
  max-width: 760px;
  aspect-ratio: 16 / 9;
  background: #000;
  border: 3px solid #ffffff;
  border-radius: 8px;
  overflow: hidden;
  z-index: 3;
}

@media (max-width: 800px) {
  .main-video-wrapper {
    width: 100%;
    max-width: 100%;
  }
}

.main-video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.side-preview-card {
  position: relative;
  width: 18%;
  max-width: 200px;
  aspect-ratio: 16 / 9;
  background: #1e1e24;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.side-preview-card:hover {
  opacity: 0.95;
  transform: scale(1.05);
  border-color: #ff66aa;
}

.side-preview-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.preview-backdrop-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2;
}

/* VIDEO CONTROLS */
.video-top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
  z-index: 4;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.main-video-wrapper:hover .video-top-bar {
  opacity: 1;
  pointer-events: auto;
}

.video-center-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  background: rgba(0, 0, 0, 0.32);
}

.video-autoplay-hint {
  background: rgba(18, 18, 24, 0.85);
  border: 1px solid rgba(255, 102, 170, 0.6);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.autoplay-unlock-banner {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 95;
  background: rgba(24, 22, 32, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid #ff66aa;
  border-radius: 999px;
  cursor: pointer;
  outline: none;
  max-width: calc(100vw - 32px);
  white-space: nowrap;
  animation: pulsePinkBorder 2.2s ease-in-out infinite;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.autoplay-unlock-banner:hover {
  background: rgba(40, 26, 46, 0.98);
  transform: translateX(-50%) scale(1.03);
}

@media (max-width: 600px) {
  .autoplay-unlock-banner {
    white-space: normal;
    text-align: center;
    border-radius: 14px;
    bottom: 16px;
  }
}

@keyframes pulsePinkBorder {
  0%, 100% {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.65), 0 0 0 0 rgba(255, 102, 170, 0.45);
  }
  50% {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.75), 0 0 18px 2px rgba(255, 102, 170, 0.65);
  }
}

.video-bottom-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
  z-index: 4;
}

/* VIDEO VOLUME SLIDER */
.video-volume-group {
  min-width: 90px;
  max-width: 125px;
}

.video-volume-slider {
  max-width: 70px;
}

/* COMMENTATOR AUDIO BAR & SEEKBAR (IMAGE 3) */
.mic-toggle-btn {
  transition: transform 0.2s ease;
}

.mic-toggle-btn:hover {
  transform: scale(1.1);
}

.commentator-audio-bar {
  background: #1b1b22;
  border: 1px solid rgba(255, 102, 170, 0.25);
  border-radius: 8px;
}

.commentator-name-wrap {
  min-width: 130px;
}

.commentary-seekbar-group {
  min-width: 180px;
}

.commentary-seek-slider {
  max-width: 100%;
}

.commentary-volume-inline {
  min-width: 110px;
}

.commentary-volume-slider {
  max-width: 65px;
}

.script-scroll-box {
  background: #1b1b22;
  border: 1px solid rgba(255, 102, 170, 0.2);
  border-radius: 8px;
  max-height: 80px;
  overflow-y: auto;
}

.script-scroll-content {
  padding-right: 6px;
}

.script-line {
  line-height: 1.55;
}

.script-scroll-box::-webkit-scrollbar {
  width: 5px;
}
.script-scroll-box::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.script-scroll-box::-webkit-scrollbar-thumb {
  background: rgba(255, 102, 170, 0.5);
  border-radius: 4px;
}
.script-scroll-box::-webkit-scrollbar-thumb:hover {
  background: #ff66aa;
}

/* MAP & SKIN PILLS */
.button-pills-row {
  position: relative;
  z-index: 2;
}

.button-pills-row .v-btn {
  letter-spacing: 0.5px;
}

.beatmap-link-btn {
  border-color: rgba(255, 255, 255, 0.4) !important;
}

.beatmap-link-btn:hover {
  border-color: #ff66aa !important;
}

.osu-mode-icon {
  display: inline-block;
  vertical-align: middle;
}

.global-rank-inline {
  opacity: 0.85;
  letter-spacing: 0.3px;
}

/* TOP 2026 PP PLAYS CARD GRID */
.top-plays-section {
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
}

.top-play-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  min-height: 92px;
  background-color: #181820;
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}

.top-play-card:hover {
  transform: translateY(-2px);
  border-color: #ff66aa;
  box-shadow: 0 4px 18px rgba(255, 102, 170, 0.32);
}

.top-play-card-bg {
  position: absolute;
  inset: -8px;
  background-size: cover;
  background-position: center;
  filter: blur(6px) brightness(0.8);
  transform: scale(1.06);
  z-index: 0;
  transition: filter 0.25s ease, transform 0.25s ease;
}

.top-play-card:hover .top-play-card-bg {
  filter: blur(4px) brightness(0.88);
  transform: scale(1.08);
}

.top-play-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(16, 16, 22, 0.22) 0%, rgba(10, 10, 16, 0.48) 100%);
  z-index: 1;
}

.top-play-card-content {
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
}

.top-play-title-wrap {
  min-width: 0;
  flex: 1 1 auto;
}

.top-play-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.play-grade-badge {
  font-size: 0.72rem;
  font-weight: 900;
  padding: 2px 7px;
  border-radius: 5px;
  border: 1px solid transparent;
  line-height: 1.2;
  flex-shrink: 0;
  text-shadow: none;
}

.play-grade-badge.grade-silver {
  background: rgba(30, 36, 46, 0.8);
  color: #e2e8f0;
  border-color: rgba(226, 232, 240, 0.55);
}

.play-grade-badge.grade-gold {
  background: rgba(42, 34, 14, 0.8);
  color: #facc15;
  border-color: rgba(250, 204, 21, 0.55);
}

.play-grade-badge.grade-green {
  background: rgba(18, 38, 26, 0.8);
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.5);
}

.play-mod-badge {
  font-size: 0.68rem;
  font-weight: 800;
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid transparent;
  line-height: 1.25;
  text-shadow: none;
}

.play-mod-badge.mod-hd {
  background: rgba(42, 34, 12, 0.82);
  color: #facc15;
  border-color: rgba(250, 204, 21, 0.45);
}

.play-mod-badge.mod-dt {
  background: rgba(36, 20, 48, 0.82);
  color: #c084fc;
  border-color: rgba(192, 132, 252, 0.45);
}

.play-mod-badge.mod-hr {
  background: rgba(48, 18, 22, 0.82);
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.45);
}

.play-mod-badge.mod-ez {
  background: rgba(18, 42, 28, 0.82);
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.45);
}

.play-mod-badge.mod-default {
  background: rgba(24, 24, 34, 0.82);
  color: #e5e7eb;
  border-color: rgba(255, 255, 255, 0.3);
}

.play-pp-badge {
  font-size: 0.78rem;
  padding: 2px 8px;
  border-radius: 5px;
  background: rgba(24, 14, 24, 0.85);
  border: 1px solid rgba(255, 102, 170, 0.65);
  color: #ff80bf;
  line-height: 1.25;
  flex-shrink: 0;
  text-shadow: none;
}

/* REMARKS INTERACTIVE DIVIDER & HOVER PEEKING */
.remarks-interactive-area {
  position: relative;
  width: 100%;
}

.remarks-divider-bar {
  cursor: pointer;
  user-select: none;
  padding: 8px 0;
  transition: opacity 0.2s ease;
}

.remarks-divider-text {
  cursor: pointer;
  letter-spacing: 0.5px;
  user-select: none;
  transition: color 0.25s ease, text-shadow 0.25s ease;
}

.remarks-divider-bar:hover .remarks-divider-text {
  color: #ff66aa !important;
  text-shadow: 0 0 12px rgba(255, 102, 170, 0.6);
}

.divider-line {
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  transition: background 0.3s ease;
}

.remarks-divider-bar:hover .divider-line {
  background: rgba(255, 102, 170, 0.6);
}

/* PEEKING CARD (HOVER PREVIEW) */
.remarks-peeking-container {
  position: relative;
  max-width: 820px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.25s ease;
}

.remarks-peeking-card {
  background-color: #1b1b22;
  border: 1px solid rgba(255, 102, 170, 0.3);
  border-radius: 10px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.remarks-peeking-container:hover .remarks-peeking-card {
  border-color: #ff66aa;
  box-shadow: 0 0 16px rgba(255, 102, 170, 0.45);
}

.slide-peek-enter-active,
.slide-peek-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-peek-enter {
  opacity: 0;
  transform: translateY(10px);
}

.slide-peek-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* EXPANDED REMARKS LIST */
.remark-card {
  background-color: #1b1b22 !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.remark-card:hover {
  border-color: rgba(255, 102, 170, 0.4);
  transform: translateY(-2px);
}

.remark-body-text {
  line-height: 1.6;
}

/* TRANSITIONS */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.zoom-enter-active, .zoom-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.zoom-enter, .zoom-leave-to {
  transform: scale(0.6);
  opacity: 0;
}

.fade-switch-enter-active, .fade-switch-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-switch-enter {
  opacity: 0;
  transform: scale(0.8);
}
.fade-switch-leave-to {
  opacity: 0;
  transform: scale(1.15);
}
</style>

