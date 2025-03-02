<template>
  <div class="scale-player">
    <div class="notation-container">
      <div
        ref="notationElem"
        :class="mode"
      ></div>
      <div ref="audioElem"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType, onMounted } from 'vue';
import abcjs, { SynthObjectController, TuneObjectArray } from 'abcjs';
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

const notationElem = ref(null);
const audioElem = ref(null);
const tonality = ref(props.tonality);
const clef = ref(props.clef);
const mode = ref(props.mode);

const visualObj = ref<TuneObjectArray>();
const synthControl = ref<SynthObjectController>();

const generateChords = (tonality: { treble: string[]; bass: string[]; names: string[] }, clef: string) => {
  const scale: string[] = tonality[clef as keyof typeof tonality];
  const extendedScale = scale.concat(scale.slice(1).map((note: string) => note + "'"));
  const extendedNames = tonality['names'].concat(tonality['names'].slice(1));

  return scale.map((note: string, index: number) => {
    const chord = [note, extendedScale[index + 2], extendedScale[index + 4]];
    let mode = '';

    switch (index) {
      case 0:
      case 3:
      case 7:
      case 4:
        mode = '';
        break;
      case 6:
        mode = 'm°';
        break;
      default:
        mode = 'm';
    }

    return `"${extendedNames[index]}${mode}" [${chord.join(' ')}]`;
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

const getRandomChords = (chords: string[], count: number) => {
  const indices = Array.from({ length: chords.length }, (_, i) => i);
  const shuffledIndices = indices.sort(() => 0.5 - Math.random()).slice(0, count);
  const randomChords = shuffledIndices.map((index) => chords[index]);

  const romanNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
  const randomIndices = shuffledIndices.map((index) => romanNumerals[index]);

  return { randomChords: randomChords.join(' | '), randomIndices: randomIndices.join(' ') };
};

const renderNotation = async () => {
  if (!notationElem.value) {
    return;
  }

  const scale: any = majorScales[tonality.value];
  const chords: string[] = generateChords(scale, clef.value);
  const metrum = mode.value !== 'jam' ? null : 'M: 4/4';
  const len = mode.value !== 'jam' ? '1/4' : '1';
  const tempo = mode.value !== 'chords' ? null : 'Q: 1/4=80';
  let notes, text;

  if (mode.value === 'jam') {
    chords.pop();
    const { randomChords, randomIndices } = getRandomChords(chords, 4);
    notes = `${randomChords}`;
    text = randomIndices;
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
    `[V: T] ${notes}|`,
    `w: ${text}`,
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

const initSynth = async () => {
  if (!abcjs.synth.supportsAudio() || !audioElem.value || !visualObj.value) {
    return;
  }

  synthControl.value = new abcjs.synth.SynthController();

  const createCursorControl = () => {
    return {
      onStart: () => {
        emit('is-playing', true);
      },
      onFinished: () => {
        emit('is-playing', false);
      },
    };
  };

  synthControl.value.load(audioElem.value, createCursorControl(), {
    displayPlay: true,
    displayLoop: false,
    displayRestart: false,
    displayProgress: false,
    displayWarp: false,
  });

  synthControl.value.disable(true);

  await synthControl.value.setTune(visualObj.value[0], false, { chordsOff: true });
};

watch(
  () => props.tonality,
  (newValue) => {
    tonality.value = newValue;
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
    renderNotation();
  },
);

onMounted(() => {
  renderNotation();
  window.addEventListener('resize', renderNotation);
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

@media (max-width: 913px) {
  .notation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
