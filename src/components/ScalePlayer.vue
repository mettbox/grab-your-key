<template>
  <div class="scale-player">
    <div class="notation-container">
      <div
        ref="notationElem"
        :class="[mode, { 'notes-hidden': mode === 'ear' && !areNotesRevealed }]"
      ></div>
      <div class="player-controls">
        <div ref="audioElem"></div>
        <button
          v-if="mode === 'ear'"
          class="control-button"
          aria-label="Show notes"
          :disabled="areNotesRevealed"
          @click="areNotesRevealed = true"
        >
          <ion-icon :icon="areNotesRevealed ? eyeOutline : eyeOffOutline" />
        </button>
        <button
          v-if="mode === 'ear'"
          class="control-button"
          aria-label="New exercise"
          :disabled="isPlaying"
          @click="startNewEarExercise"
        >
          <ion-icon :icon="refreshOutline" />
        </button>
        <ion-range
          v-if="mode === 'jam'"
          class="tempo-range"
          :min="40"
          :max="160"
          :step="5"
          :pin="true"
          :value="bpm"
          :disabled="isPlaying"
          @ionChange="updateBpm"
        >
          <ion-label slot="start">♩ = {{ bpm }}</ion-label>
        </ion-range>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType, onMounted, onUnmounted } from 'vue';
import { IonIcon, IonLabel, IonRange } from '@ionic/vue';
import { eyeOffOutline, eyeOutline, refreshOutline } from 'ionicons/icons';
import abcjs, { NoteTimingEvent, SynthObjectController, SynthOptions, TuneObjectArray } from 'abcjs';
import 'abcjs/abcjs-audio.css';

const props = defineProps({
  tonality: {
    type: String as PropType<string>,
    required: true,
  },
  clef: {
    type: String as PropType<string>,
    default: 'treble',
  },
  mode: {
    type: String as PropType<string>,
    default: 'scales',
  },
});

const majorScales: Record<string, { treble: string[]; bass: string[]; names: string[] }> = {
  C: {
    treble: ['C', 'D', 'E', 'F', 'G', 'A', 'B', "C'"],
    bass: ['C,', 'D,', 'E,', 'F,', 'G,', 'A,', 'B,', 'C'],
    names: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
  },
  'C#': {
    treble: ['C', 'D', 'E', 'F', 'G', 'A', 'B', "C'"],
    bass: ['C,', 'D,', 'E,', 'F,', 'G,', 'A,', 'B,', 'C'],
    names: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#'],
  },
  Db: {
    treble: ['D', 'E', 'F', 'G', 'A', 'B', "C'", "D'"],
    bass: ['D,', 'E,', 'F,', 'G,', 'A,', 'B,', 'C', 'D'],
    names: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db'],
  },
  D: {
    treble: ['D', 'E', 'F', 'G', 'A', 'B', "C'", "D'"],
    bass: ['D,', 'E,', 'F,', 'G,', 'A,', 'B,', 'C', 'D'],
    names: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D'],
  },
  'D#': {
    treble: ['D', 'E', 'F', 'G', 'A', 'B', "C'", "D'"],
    bass: ['D,', 'E,', 'F,', 'G,', 'A,', 'B,', 'C', 'D'],
    names: ['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C##', 'D#'],
  },
  Eb: {
    treble: ['E', 'F', 'G', 'A', 'B', "C'", "D'", "E'"],
    bass: ['E,,', 'F,,', 'G,,', 'A,,', 'B,,', 'C,', 'D,', 'E,'],
    names: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'],
  },
  E: {
    treble: ['E', 'F', 'G', 'A', 'B', "C'", "D'", "E'"],
    bass: ['E,,', 'F,,', 'G,,', 'A,,', 'B,,', 'C,', 'D,', 'E,'],
    names: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#', 'E'],
  },
  F: {
    treble: ['F', 'G', 'A', 'B', "C'", "D'", "E'", "F'"],
    bass: ['F,,', 'G,,', 'A,,', 'B,,', 'C,', 'D,', 'E,', 'F,'],
    names: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'],
  },
  'F#': {
    treble: ['F', 'G', 'A', 'B', "C'", "D'", "E'", "F'"],
    bass: ['F,,', 'G,,', 'A,,', 'B,,', 'C,', 'D,', 'E,', 'F,'],
    names: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#'],
  },
  Gb: {
    treble: ['G', 'A', 'B', "C'", "D'", "E'", "F'", "G'"],
    bass: ['G,,', 'A,,', 'B,,', 'C,', 'D,', 'E,', 'F,', 'G,'],
    names: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb'],
  },
  G: {
    treble: ['G', 'A', 'B', "C'", "D'", "E'", "F'", "G'"],
    bass: ['G,,', 'A,,', 'B,,', 'C,', 'D,', 'E,', 'F,', 'G,'],
    names: ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'],
  },
  Ab: {
    treble: ['A', 'B', "C'", "D'", "E'", "F'", "G'", "A'"],
    bass: ['A,,', 'B,,', 'C,', 'D,', 'E,', 'F,', 'G,', 'A,'],
    names: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab'],
  },
  A: {
    treble: ['A', 'B', "C'", "D'", "E'", "F'", "G'", "A'"],
    bass: ['A,,', 'B,,', 'C,', 'D,', 'E,', 'F,', 'G,', 'A,'],
    names: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#', 'A'],
  },
  Bb: {
    treble: ['B,', 'C', 'D', 'E', 'F', 'G', 'A', 'B'],
    bass: ['B,,', 'C,', 'D,', 'E,', 'F,', 'G,', 'A,', 'B,'],
    names: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
  },
  B: {
    treble: ['B,', 'C', 'D', 'E', 'F', 'G', 'A', 'B'],
    bass: ['B,,', 'C,', 'D,', 'E,', 'F,', 'G,', 'A,', 'B,'],
    names: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'],
  },
};

const emit = defineEmits(['is-playing']);

const notationElem = ref<HTMLElement | null>(null);
const audioElem = ref(null);
const tonality = ref(props.tonality);
const clef = ref(props.clef);
const mode = ref(props.mode);

const visualObj = ref<TuneObjectArray>();
const synthControl = ref<SynthObjectController>();
const bpm = ref(80);
const isPlaying = ref(false);
const jamChordIndices = ref<number[]>([]);
const earNoteIndices = ref<number[]>([]);
const areNotesRevealed = ref(false);

const jamChordCount = 4;
const earNoteCount = 4;
// GM percussion: hi wood block (76) accents beat 1, low wood block (77) on beats 2-4, followed by velocities
const metronomePattern = 'dddd 76 77 77 77 110 80 80 80';

const chordQualities = ['', 'm', 'm', '', '', 'm', 'm°'];

const generateChords = (tonality: { treble: string[]; bass: string[]; names: string[] }, clef: string) => {
  const scale: string[] = tonality[clef as keyof typeof tonality];
  const extendedScale = scale.concat(scale.slice(1).map((note: string) => note + "'"));
  const extendedNames = tonality['names'].concat(tonality['names'].slice(1));

  return scale.map((note: string, index: number) => {
    const chord = [note, extendedScale[index + 2], extendedScale[index + 4]];

    return `"${extendedNames[index]}${chordQualities[index % 7]}" [${chord.join(' ')}]`;
  });
};

// Voices every triad inside the tonic octave (inversions instead of stacking upwards),
// so a random progression stays in one register.
const generateJamChords = (tonality: { treble: string[]; bass: string[]; names: string[] }, clef: string) => {
  const scale: string[] = tonality[clef as keyof typeof tonality];

  return chordQualities.map((quality, index) => {
    const chord = [index, index + 2, index + 4]
      .map((degree) => degree % 7)
      .sort((a, b) => a - b)
      .map((degree) => scale[degree]);

    return `"${tonality['names'][index]}${quality}" [${chord.join(' ')}]`;
  });
};

const replaceAccidental = (note: string) => {
  if (note.length > 1) {
    const accidental = note.charAt(1);
    switch (accidental) {
      case 'b':
        return note.charAt(0) + '♭';
      case '#':
        return note.charAt(0) + '♯';
      case 'x':
        return note.charAt(0) + '𝄪';
    }
  }
  return note;
};

const romanNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

const pickRandomChordIndices = (count: number) => {
  const indices = Array.from({ length: romanNumerals.length }, (_, i) => i);
  return indices.sort(() => 0.5 - Math.random()).slice(0, count);
};

const formatJamChords = (chords: string[], indices: number[]) => {
  return {
    jamChords: indices.map((index) => chords[index]).join(' | '),
    jamNumerals: indices.map((index) => romanNumerals[index]).join(' '),
  };
};

const pickRandomNoteIndices = (scaleLength: number, count: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * scaleLength));
};

const shuffleEarNotes = () => {
  earNoteIndices.value = pickRandomNoteIndices(majorScales[tonality.value].names.length, earNoteCount);
  areNotesRevealed.value = false;
};

const shuffleExercises = () => {
  jamChordIndices.value = pickRandomChordIndices(jamChordCount);
  shuffleEarNotes();
};

const startNewEarExercise = () => {
  shuffleEarNotes();
  renderNotation();
};

const updateBpm = (event: CustomEvent) => {
  bpm.value = event.detail.value;
};

const renderNotation = async () => {
  if (!notationElem.value) {
    return;
  }

  const scale: any = majorScales[tonality.value];
  const chords: string[] = generateChords(scale, clef.value);
  const metrum = mode.value === 'jam' || mode.value === 'ear' ? 'M: 4/4' : null;
  const len = mode.value === 'jam' ? '1' : '1/4';
  const tempo =
    mode.value === 'chords' || mode.value === 'ear' ? 'Q: 1/4=80' : mode.value === 'jam' ? `Q: 1/4=${bpm.value}` : null;
  const finalBar = mode.value === 'jam' ? ':|' : '|';
  let notes, text;

  if (mode.value === 'jam') {
    const { jamChords, jamNumerals } = formatJamChords(generateJamChords(scale, clef.value), jamChordIndices.value);
    notes = jamChords;
    text = jamNumerals;
  } else if (mode.value === 'ear') {
    notes = earNoteIndices.value.map((index) => scale[clef.value][index]).join(' ');
    // Lyrics render inside the note groups, so they stay hidden together with the notes until revealed
    text = earNoteIndices.value.map((index) => replaceAccidental(scale['names'][index])).join(' ');
  } else {
    notes = mode.value === 'scales' ? scale[clef.value].join(' ') : chords.join(' ');
    text = mode.value === 'scales' ? scale['names'].map(replaceAccidental).join(' ') : 'I ii iii IV V vi vii° I';
  }

  const abcNotation = [
    `V: T clef=${clef.value}`,
    `${metrum}`,
    `${tempo}`,
    `L: ${len}`,
    `K: ${tonality.value}`,
    `[V: T] ${notes}${finalBar}`,
    text ? `w: ${text}` : null,
  ].join('\n');

  visualObj.value = abcjs.renderAbc(notationElem.value, abcNotation, {
    add_classes: true,
    paddingleft: 0,
    paddingright: 0,
    selectionColor: 'white',
    jazzchords: true,
    staffwidth: window.innerWidth < 512 ? 320 : 400,
  });

  await initSynth();
};

const highlightClass = 'abcjs-highlight';

const clearHighlight = () => {
  notationElem.value
    ?.querySelectorAll(`.${highlightClass}`)
    .forEach((element) => element.classList.remove(highlightClass));
};

const highlightPlayedElements = (event: NoteTimingEvent) => {
  clearHighlight();
  event.elements?.flat().forEach((element) => element.classList.add(highlightClass));
};

const initSynth = async () => {
  if (!abcjs.synth.supportsAudio() || !audioElem.value || !visualObj.value) {
    return;
  }

  const controller = new abcjs.synth.SynthController();
  synthControl.value = controller;

  const setPlaying = (playing: boolean) => {
    isPlaying.value = playing;
    emit('is-playing', playing);
  };

  const createCursorControl = () => {
    return {
      onStart: () => {
        setPlaying(true);
      },
      onFinished: () => {
        setPlaying(false);
        clearHighlight();
      },
      onEvent: highlightPlayedElements,
    };
  };

  // A looping tune never finishes, so pressing the play button again (which pauses) is the only way to stop.
  // abcjs has no pause callback, so wrap pause to treat it as "stop and rewind".
  // setTune also calls pause internally, hence the isPlaying guard.
  const stopLoop = () => {
    if (!isPlaying.value) {
      return;
    }

    controller.restart();
    controller.setProgress(0);
    clearHighlight();
    setPlaying(false);
  };

  if (mode.value === 'jam') {
    const pausePlayback = controller.pause;
    controller.pause = () => {
      pausePlayback();
      stopLoop();
    };
  }

  controller.load(audioElem.value, createCursorControl(), {
    displayPlay: true,
    displayLoop: false,
    displayRestart: false,
    displayProgress: false,
    displayWarp: false,
  });

  controller.disable(true);

  const audioParams: SynthOptions = { chordsOff: true };

  if (mode.value === 'jam') {
    audioParams.drum = metronomePattern;
    audioParams.drumBars = 1;
  }

  await controller.setTune(visualObj.value[0], false, audioParams);

  if (mode.value === 'jam') {
    controller.toggleLoop();
  }
};

watch(
  () => props.tonality,
  (newValue) => {
    tonality.value = newValue;
    shuffleExercises();
    renderNotation();
  },
);

watch(
  () => props.clef,
  (newValue) => {
    clef.value = newValue;
    renderNotation();
  },
);

watch(
  () => props.mode,
  (newValue) => {
    mode.value = newValue;
    shuffleExercises();
    renderNotation();
  },
);

watch(bpm, renderNotation);

onMounted(() => {
  shuffleExercises();
  renderNotation();
  window.addEventListener('resize', renderNotation);
});

onUnmounted(() => {
  window.removeEventListener('resize', renderNotation);
});
</script>

<style>
.scale-player {
  color: rgb(128, 149, 158);

  width: 100%;
  max-width: 100%;

  .abcjs-staff path,
  .abcjs-bar path,
  .abcjs-clef path,
  .abcjs-key-signature path,
  .abcjs-time-signature path {
    fill: rgb(60, 70, 80);
  }

  .abcjs-note path {
    fill: var(--ion-text-color);
  }

  text {
    font-family: 'music';
    font-weight: normal;
    fill-opacity: 0.7;
  }

  .abcjs-highlight path {
    fill: var(--ion-color-primary);
  }

  .abcjs-highlight text {
    fill: var(--ion-color-primary);
    fill-opacity: 1;
  }

  .notes-hidden .abcjs-note,
  .notes-hidden .abcjs-stem {
    visibility: hidden;
  }

  /* hide tempo */
  .abcjs-tempo {
    display: none;
  }
}

.abcjs-inline-audio {
  background: transparent;
  padding: 6px 0 6px 7px;
  margin: 20px 0;
  background-color: var(--ion-item-background) !important;
  border-radius: 10px;
  width: 42px;
  height: 34px;

  .abcjs-midi-loop.abcjs-pushed {
    border: 0 none;
    background: transparent;
    box-sizing: border-box;

    g {
      fill: var(--ion-color-primary);
      stroke: var(--ion-color-tertiary);
    }
  }

  .abcjs-btn {
    svg {
      width: 100%;
      height: 100%;
    }

    g {
      fill: var(--ion-text-color);
      stroke: var(--ion-text-color);
    }
  }
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 34px;
  padding: 0;
  border: 0 none;
  border-radius: 10px;
  background-color: var(--ion-item-background);
  color: var(--ion-text-color);
  font-size: 20px;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
}

.tempo-range {
  flex: 1;
  max-width: 260px;
  /* ion-range reserves space above itself for the pin, which pushes it off center next to the play button */
  padding-top: 0;
  padding-bottom: 0;
}

@media (max-width: 913px) {
  .notation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
