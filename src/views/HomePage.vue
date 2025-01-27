<template>
  <ion-page>
    <ion-header
      :translucent="false"
      class="ion-no-border"
    >
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="secondary"></ion-menu-button>
        </ion-buttons>
        <ion-segment
          :value="clef"
          @ionChange="updateClef"
          :disabled="isPlaying"
        >
          <ion-segment-button value="bass">
            <ion-label>𝄢</ion-label>
          </ion-segment-button>
          <ion-segment-button value="treble">
            <ion-label>𝄞</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-buttons
          slot="end"
          style="width: 41px"
        />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid class="ion-align-items-center ion-justify-content-center">
        <ion-row class="ion-align-items-center">
          <ion-col class="ion-padding">
            <circle-of-fifths
              class="ion-float-md-right"
              :tonality="tonality"
              @update:tonality="updateTonality"
              style="width: 440px"
              :style="{ 'pointer-events': isPlaying ? 'none' : 'auto' }"
            />
          </ion-col>
          <ion-col class="ion-padding">
            <scale-player
              class="ion-float-md-left"
              :tonality="tonality"
              :clef="clef"
              :mode="mode"
              style="width: 440px"
              @is-playing="isPlaying = $event"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

    <ion-footer
      :translucent="false"
      class="ion-no-border"
    >
      <ion-toolbar>
        <ion-segment
          :value="mode"
          @ionChange="updateMode"
          :disabled="isPlaying"
        >
          <ion-segment-button value="scales">
            <ion-label>Scale</ion-label>
          </ion-segment-button>
          <ion-segment-button value="chords">
            <ion-label>Chords</ion-label>
          </ion-segment-button>
          <ion-segment-button value="jam">
            <ion-label>Jam</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonFooter,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/vue';
import CircleOfFifths from '@/components/CircleOfFifths.vue';
import ScalePlayer from '@/components/ScalePlayer.vue';
import { ref } from 'vue';

const tonality = ref('C');
const clef = ref('bass');
const mode = ref('scales');
const isPlaying = ref(false);

const updateTonality = (value: string) => {
  tonality.value = value;
};

const updateMode = (event: CustomEvent) => {
  mode.value = event.detail.value;
};

const updateClef = (event: CustomEvent) => {
  clef.value = event.detail.value;
};
</script>

<style scoped>
ion-toolbar {
  --background: transparent;
}

ion-segment {
  ion-label {
    font-family: 'music';
  }
}

@media (min-width: 914px) {
  ion-grid,
  ion-row {
    height: 100%;
  }
}

@media (max-width: 913px) {
  .ion-float-md-right,
  .ion-float-md-left {
    margin: 0 auto;
    display: flex;
  }

  ion-row {
    ion-col {
      display: flex;
    }
  }
}
</style>
