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
        <ion-buttons slot="end">
          <ion-button
            color="secondary"
            aria-label="Choose sound"
            :disabled="isPlaying"
            @click="openInstrumentSelect"
          >
            <span
              slot="icon-only"
              class="music-glyph"
              >♫</span
            >
          </ion-button>
          <!-- hidden, only its modal is used, opened by the button above -->
          <ion-select
            ref="instrumentSelect"
            class="instrument-select"
            :value="instrument"
            @ionChange="updateInstrument"
            interface="modal"
            :interface-options="{ header: 'Sound', cssClass: 'sound-modal' }"
            aria-label="Sound"
          >
            <ion-select-option
              v-for="option in instruments"
              :key="option.program"
              :value="option.program"
            >
              {{ option.name }}
            </ion-select-option>
          </ion-select>
        </ion-buttons>
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
              :instrument="instrument"
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
          <ion-segment-button value="scale">
            <ion-label>Scale</ion-label>
          </ion-segment-button>
          <ion-segment-button value="chords">
            <ion-label>Chords</ion-label>
          </ion-segment-button>
          <ion-segment-button value="jam">
            <ion-label>Jam</ion-label>
          </ion-segment-button>
          <ion-segment-button value="ear">
            <ion-label>Ear</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
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
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
import CircleOfFifths from '@/components/CircleOfFifths.vue';
import ScalePlayer from '@/components/ScalePlayer.vue';
import { ref } from 'vue';
import { instruments, loadInstrument, saveInstrument } from '@/instruments';

const tonality = ref('C');
const clef = ref('bass');
const mode = ref('scale');
const isPlaying = ref(false);

const instrument = ref(loadInstrument());
const instrumentSelect = ref<InstanceType<typeof IonSelect>>();

const updateTonality = (value: string) => {
  tonality.value = value;
};

const updateMode = (event: CustomEvent) => {
  mode.value = event.detail.value;
};

const updateClef = (event: CustomEvent) => {
  clef.value = event.detail.value;
};

const openInstrumentSelect = () => {
  instrumentSelect.value?.$el.open();
};

const updateInstrument = (event: CustomEvent) => {
  instrument.value = event.detail.value;
  saveInstrument(instrument.value);
};
</script>

<style scoped>
ion-toolbar {
  --background: transparent;
}

.music-glyph {
  font-family: 'music';
  font-size: 26px;
  /* the glyph sits low in the font's line box */
  margin-top: -0.4em;
}

.instrument-select {
  display: none;
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
