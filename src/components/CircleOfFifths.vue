<template>
  <div class="circle-of-fifths">
    <svg
      viewBox="0 0 2158 2158"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g transform="translate(-147 -79)">
          <g transform="translate(-96 -164)">
            <g
              class="rotating-circles"
              :style="`transform: translate(457px, 467px) rotate(${rotation}deg)`"
              transform-origin="858px 858px"
              transform="translate(464 465)"
            >
              <g
                class="main-circle"
                transform="rotate(-15 1379.065 178.935)"
              >
                <path
                  @click="selected = 'C'"
                  d="M705.5 5.522v239.011a455.466 455.466 0 01217.47 58.272l119.506-206.993A694.454 694.454 0 00705.5 5.522z"
                />
                <path
                  @click="selected = 'G'"
                  d="M1052.002 101.312L932.496 308.306a455.534 455.534 0 01159.198 159.198l206.994-119.506a694.597 694.597 0 00-246.686-246.686z"
                />
                <path
                  @click="selected = 'D'"
                  d="M1304.188 357.524L1097.195 477.03a455.466 455.466 0 0158.272 217.47h239.011a694.454 694.454 0 00-90.29-336.976z"
                />
                <path
                  @click="selected = 'A'"
                  d="M1394.478 705.5h-239.011a455.466 455.466 0 01-58.272 217.47l206.993 119.506a694.454 694.454 0 0090.29-336.976z"
                />
                <path
                  @click="selected = 'E'"
                  d="M1298.688 1052.002l-206.994-119.506a455.534 455.534 0 01-159.198 159.198l119.506 206.994a694.597 694.597 0 00246.686-246.686z"
                />
                <path
                  @click="selected = 'B'"
                  d="M1042.476 1304.188L922.97 1097.195a455.466 455.466 0 01-217.47 58.272v239.011a694.454 694.454 0 00336.976-90.29z"
                />
                <path
                  @click="selected = 'F#'"
                  d="M694.5 1394.478v-239.011a455.466 455.466 0 01-217.47-58.272l-119.506 206.993a694.454 694.454 0 00336.976 90.29z"
                />
                <path
                  @click="selected = 'Db'"
                  d="M347.998 1298.688l119.506-206.994a455.534 455.534 0 01-159.198-159.198l-206.994 119.506a694.597 694.597 0 00246.686 246.686z"
                />
                <path
                  @click="selected = 'Ab'"
                  d="M95.812 1042.476L302.805 922.97a455.466 455.466 0 01-58.272-217.47H5.522a694.454 694.454 0 0090.29 336.976z"
                />
                <path
                  @click="selected = 'Eb'"
                  d="M5.522 694.5h239.011a455.466 455.466 0 0158.272-217.47L95.812 357.524A694.454 694.454 0 005.522 694.5z"
                />
                <path
                  @click="selected = 'Bb'"
                  d="M101.312 347.998l206.994 119.506a455.534 455.534 0 01159.198-159.198L347.998 101.312a694.597 694.597 0 00-246.686 246.686z"
                />
                <path
                  @click="selected = 'F'"
                  d="M357.524 95.812L477.03 302.805a455.466 455.466 0 01217.47-58.272V5.522a694.454 694.454 0 00-336.976 90.29z"
                />

                <text
                  transform="rotate(15 846.135 157.057)"
                  font-size="111"
                >
                  <tspan
                    x="813.002"
                    y="185.557"
                  >
                    <!-- 1 - C -->
                    {{ getNoteName(0) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(45 1094.977 291.444)"
                  font-size="111"
                >
                  <tspan
                    x="1055.683"
                    y="319.944"
                  >
                    <!-- 2 - G -->
                    {{ getNoteName(1) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(75 1248.077 541.968)"
                  font-size="111"
                >
                  <tspan
                    x="1207.451"
                    y="570.468"
                  >
                    <!-- 3 - D -->
                    {{ getNoteName(2) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(105 1248 846.5)"
                  font-size="111"
                >
                  <tspan
                    x="1207.485"
                    y="875"
                  >
                    <!-- 4 - A -->
                    {{ getNoteName(3) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(135 1107.138 1104.664)"
                  font-size="111"
                >
                  <tspan
                    x="1071.452"
                    y="1133.164"
                  >
                    <!-- 5 - E -->
                    {{ getNoteName(4) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(165 846.545 1238.787)"
                  font-size="111"
                >
                  <tspan
                    x="808.083"
                    y="1267.287"
                  >
                    <!-- 6 - B -->
                    {{ getNoteName(5) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-165 551.841 1232.887)"
                  font-size="111"
                >
                  <tspan
                    x="492.114"
                    y="1249.387"
                  >
                    <!-- 7 - F♯ / G♭-->
                    {{ getNoteName(6) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-135 295.14 1082.757)"
                  font-size="111"
                >
                  <tspan
                    x="231.308"
                    y="1099.257"
                  >
                    <!-- 8 - D♭ / C♯ /-->
                    {{ getNoteName(7) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-105 151.08 836.065)"
                  font-size="111"
                >
                  <tspan
                    x="87.358"
                    y="852.565"
                  >
                    <!-- 9 - A♭ / G♯ /-->
                    {{ getNoteName(8) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-75 153.744 547.937)"
                  font-size="111"
                >
                  <tspan
                    x="94.851"
                    y="564.437"
                  >
                    <!-- 10 - E♭ / D♯ /-->
                    {{ getNoteName(9) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-45 303.695 285.816)"
                  font-size="111"
                >
                  <tspan
                    x="242.027"
                    y="302.316"
                  >
                    <!-- 11 - B♭ / A♯ /-->
                    {{ getNoteName(10) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-15 558.837 158.514)"
                  font-size="111"
                >
                  <tspan
                    x="524.26"
                    y="187.014"
                  >
                    <!-- 12 - F /-->
                    {{ getNoteName(11) }}
                  </tspan>
                </text>
              </g>

              <g
                class="inner-circle"
                transform="rotate(-15 2204.034 -899.332)"
              >
                <path
                  d="M455.24 6.72v149.352a296.442 296.442 0 01137.43 36.66l75.025-129.354C602.753 27.115 529.707 7.636 455.24 6.721z"
                />
                <path
                  d="M677.208 68.505l-74.684 129.072a293.866 293.866 0 01100.13 99.913l129.368-74.524c-37.858-63.582-91.087-116.69-154.814-154.46z"
                />
                <path
                  d="M837.47 233.199l-128.956 74.506a293.64 293.64 0 0136.54 136.462h148.9a442.723 442.723 0 00-56.485-210.968z"
                />
                <path
                  d="M893.814 455.784H744.913a293.64 293.64 0 01-36.54 136.462L837.33 666.75a442.723 442.723 0 0056.485-210.967z"
                />
                <path
                  d="M831.32 674.918l-129.37-74.524a293.866 293.866 0 01-100.129 99.913l74.684 129.071c63.727-37.77 116.957-90.878 154.815-154.46z"
                />
                <path
                  d="M667.825 836.842L592.8 707.488a296.441 296.441 0 01-137.43 36.66V893.5c74.467-.914 147.513-20.394 212.455-56.657z"
                />
                <path
                  d="M444.753 893.36V744.007a296.442 296.442 0 01-137.43-36.66l-75.026 129.354c64.942 36.263 137.988 55.743 212.456 56.657z"
                />
                <path
                  d="M224.012 830.868l74.684-129.072a293.866 293.866 0 01-100.13-99.912L69.197 676.408c37.858 63.581 91.087 116.689 154.815 154.46z"
                />
                <path
                  d="M63.042 664.95l128.955-74.506a293.64 293.64 0 01-36.54-136.462H6.558a442.723 442.723 0 0056.485 210.967z"
                />
                <path
                  d="M6.438 443.33h148.9a293.64 293.64 0 0136.54-136.461L62.923 232.363A442.723 442.723 0 006.438 443.33z"
                />
                <path
                  d="M69.191 223.23l129.37 74.524a293.866 293.866 0 01100.129-99.912L224.006 68.77C160.279 106.541 107.05 159.648 69.19 223.23z"
                />
                <path
                  d="M232.426 62.272l75.026 129.355a296.441 296.441 0 01137.43-36.661V5.615c-74.468.915-147.513 20.394-212.456 56.657z"
                />

                <text
                  transform="rotate(15 544.57 95.637)"
                  font-size="71"
                >
                  <tspan
                    x="521.769"
                    y="116.637"
                  >
                    <!-- 1 - Am /-->
                    {{ getMinorNoteName(0) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-15 356.885 102.044)"
                  font-size="71"
                >
                  <tspan
                    x="332.909"
                    y="123.044"
                  >
                    <!-- 11 - Dm /-->
                    {{ getMinorNoteName(11) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-45 184.543 181.133)"
                  font-size="71"
                >
                  <tspan
                    x="161.053"
                    y="202.133"
                  >
                    <!-- 10 - Gm /-->
                    {{ getMinorNoteName(10) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-75 95.799 351.986)"
                  font-size="71"
                >
                  <tspan
                    x="77.047"
                    y="372.986"
                  >
                    <!-- 9 - Gm /-->
                    {{ getMinorNoteName(9) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-105 104.234 542.667)"
                  font-size="71"
                >
                  <tspan
                    x="88.642"
                    y="563.667"
                  >
                    <!-- 8 - Fm /-->
                    {{ getMinorNoteName(8) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(45 712.484 189.044)"
                  font-size="71"
                >
                  <tspan
                    x="692.234"
                    y="210.044"
                  >
                    <!-- 2 - Em /-->
                    {{ getMinorNoteName(1) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(75 798.698 356.048)"
                  font-size="71"
                >
                  <tspan
                    x="775.492"
                    y="377.048"
                  >
                    <!-- 3 - Bm /-->
                    {{ getMinorNoteName(2) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(105 799.387 543.159)"
                  font-size="71"
                >
                  <tspan
                    x="764.854"
                    y="553.659"
                  >
                    <!-- 4 - F♯m /-->
                    {{ getMinorNoteName(3) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(135 703.1 710.897)"
                  font-size="71"
                >
                  <tspan
                    x="665.407"
                    y="721.397"
                  >
                    <!-- 5 - C♯m /-->
                    {{ getMinorNoteName(4) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(165 542.001 813.705)"
                  font-size="71"
                >
                  <tspan
                    x="499.571"
                    y="824.205"
                  >
                    <!-- 6 - G♯m /-->
                    {{ getMinorNoteName(5) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-165 355.07 804.773)"
                  font-size="71"
                >
                  <tspan
                    x="312.154"
                    y="815.273"
                  >
                    <!-- 7 - D♯m /-->
                    {{ getMinorNoteName(6) }}
                  </tspan>
                </text>
                <text
                  transform="rotate(-135 181.799 697.518)"
                  font-size="71"
                >
                  <tspan
                    x="141.116"
                    y="708.018"
                  >
                    <!-- 8 - B♭m /-->
                    {{ getMinorNoteName(7) }}
                  </tspan>
                </text>
              </g>
            </g>

            <g
              class="outer-circle"
              transform="rotate(-15 2123.884 278.116)"
            >
              <path
                class="tonic-segment"
                d="M1084.767 6.381v374.131a698.276 698.276 0 01338.975 90.86l187.006-324.013A1072.163 1072.163 0 001084.767 6.381z"
              />
              <path
                d="M1621.06 152.254L1434.08 476.115a698.46 698.46 0 01248.112 248.112l323.86-186.978a1072.505 1072.505 0 00-384.994-384.995z"
              />
              <path
                d="M2011.799 547.456l-324.012 187.005a698.276 698.276 0 0190.859 338.976h374.131a1072.163 1072.163 0 00-140.978-525.98z"
              />
              <path
                d="M2150.971 1085.368h-374.13a698.276 698.276 0 01-90.86 338.975l324.012 187.006a1072.163 1072.163 0 00140.978-525.981z"
              />
              <path
                d="M2005.357 1620.694l-323.861-186.978a698.46 698.46 0 01-248.111 248.112l186.978 323.86a1072.505 1072.505 0 00384.994-384.994z"
              />
              <path
                d="M1611.12 2011.692l-187.004-324.011a698.276 698.276 0 01-338.976 90.859v374.13a1072.163 1072.163 0 00525.98-140.978z"
              />
              <path
                d="M546.596 146.52l187.006 324.012a698.276 698.276 0 01338.975-90.86V5.542a1072.163 1072.163 0 00-525.98 140.978z"
              />
            </g>

            <text font-size="111">
              <tspan
                x="1300.523"
                y="526"
              >
                I
              </tspan>
            </text>
            <text
              transform="rotate(-30 936 606.5)"
              font-size="111"
            >
              <tspan
                x="875.061"
                y="635"
              >
                IV
              </tspan>
            </text>
            <text
              transform="rotate(30 1711.5 589.5)"
              font-size="111"
            >
              <tspan
                x="1671.318"
                y="618"
              >
                V
              </tspan>
            </text>
            <text
              transform="rotate(60 2014.5 893.5)"
              font-size="111"
            >
              <tspan
                x="1976.205"
                y="922"
              >
                ii
              </tspan>
            </text>
            <text
              transform="rotate(90 2121.5 1322.5)"
              font-size="111"
            >
              <tspan
                x="2071.494"
                y="1351"
              >
                vi
              </tspan>
            </text>
            <text
              transform="rotate(120 2024.5 1733.5)"
              font-size="111"
            >
              <tspan
                x="1967.057"
                y="1762"
              >
                iii
              </tspan>
            </text>
            <text
              transform="rotate(150 1733.5 2023.5)"
              font-size="111"
            >
              <tspan
                x="1643.868"
                y="2052"
              >
                vii°
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <g
        class="switch-accidentals"
        :class="{ active: showEnharmonicToggle }"
      >
        <path
          d="M1079,1023c24,0,45.1,12.1,57.7,30.5h-22.8v17.4h52.3v-52.3h-17.4v21.8c-15.9-21.2-41.2-34.9-69.8-34.9-48.2,0-87.2,39-87.2,87.2h17.4c0-38.5,31.2-69.8,69.8-69.8ZM1148.8,1092.8c0,38.5-31.2,69.8-69.8,69.8s-45.1-12.1-57.7-30.5h22.8v-17.4h-52.3v52.3h17.4v-21.8c15.9,21.2,41.2,34.9,69.8,34.9,48.2,0,87.2-39,87.2-87.2h-17.4Z"
        />
        <circle
          @click="toggleAccidentals"
          cy="1079"
          cx="1073"
          r="150"
          fill="transparent"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
// https://muted.io/circle-of-fifths/

import { ref, watch, PropType } from 'vue';

const props = defineProps({
  tonality: {
    type: String as PropType<string>,
    required: true,
    default: 'C',
  },
});

const circles: Record<string, any> = {
  C: {
    rotation: 0,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'bb', 'f', 'c', 'g', 'd'],
  },
  G: {
    rotation: -30,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'bb', 'f', 'c', 'g', 'd'],
  },
  D: {
    rotation: -60,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'f', 'c', 'g', 'd'],
  },
  A: {
    rotation: -90,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'e#', 'c', 'g', 'd'],
  },
  E: {
    rotation: -120,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'e#', 'b#', 'g', 'd'],
  },
  B: {
    rotation: -150,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'e#', 'b#', 'fx', 'd'],
  },
  'F#': {
    rotation: -180,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'e#', 'b#', 'fx', 'cx'],
  },
  Gb: {
    rotation: -180,
    major: ['C', 'G', 'D', 'A', 'E', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'ab', 'eb', 'bb', 'f', 'c', 'g', 'd'],
  },
  'C#': {
    rotation: 150,
    major: ['B#', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    minor: ['gx', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'e#', 'b#', 'fx', 'cx'],
  },
  Db: {
    rotation: 150,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'eb', 'bb', 'f', 'c', 'g', 'd'],
  },
  'G#': {
    rotation: 120,
    major: ['B#', 'Fx', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    minor: ['gx', 'dx', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'e#', 'b#', 'fx', 'cx'],
  },
  Ab: {
    rotation: 120,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'bb', 'f', 'c', 'g', 'd'],
  },
  Eb: {
    rotation: 90,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'bb', 'f', 'c', 'g', 'd'],
  },
  Bb: {
    rotation: 60,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'bb', 'f', 'c', 'g', 'd'],
  },
  F: {
    rotation: 30,
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'bb', 'f', 'c', 'g', 'd'],
  },
};

const withEnharmonicToggle = ['F#', 'Gb', 'C#', 'Db'];

const emit = defineEmits(['update:tonality']);

const rotation = ref(0);
const selected = ref(props.tonality);
const circle = ref(circles['C']);
const showEnharmonicToggle = ref(false);

const toggleAccidentals = () => {
  if (selected.value === 'F#') {
    selected.value = 'Gb';
  } else if (selected.value === 'Gb') {
    selected.value = 'F#';
  } else if (selected.value === 'C#') {
    selected.value = 'Db';
  } else if (selected.value === 'Db') {
    selected.value = 'C#';
  }
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

const getNoteName = (note: number) => {
  return replaceAccidental(circle.value.major[note]);
};

const getMinorNoteName = (note: number) => {
  return replaceAccidental(circle.value.minor[note]);
};

watch(selected, (newSelection: string) => {
  circle.value = circles[newSelection];
  rotation.value = circle.value.rotation;
  showEnharmonicToggle.value = withEnharmonicToggle.includes(newSelection);
  emit('update:tonality', newSelection);
});
</script>

<style scoped>
.circle-of-fifths {
  --ion-color-circle: var(--ion-color-secondary);
  --circle-text-color: var(--ion-text-color);
  --circle-fill-color: var(--ion-color-secondary);
  --circle-stroke-color: var(--ion-background-color);
  --circle-accent-color: var(--ion-color-primary);
  --outer-circle-fill-color: var(--ion-item-background);
  --inner-circle-fill-color: var(--ion-color-tertiary);

  width: 100%;
  max-width: 400px;
  transform-box: fill-box;
  transform-origin: center;
  display: block;
  position: relative;

  svg {
    width: 100%;
    height: auto;
  }

  text {
    font-family: 'music';
    font-weight: normal;
    fill: var(--circle-text-color);
    user-select: none;
    pointer-events: none;
  }

  .switch-accidentals {
    fill: var(--circle-accent-color);
    cursor: pointer;
    transition: opacity 0.75s ease-out;
    pointer-events: none;
    opacity: 0;

    &.active {
      opacity: 1;
      pointer-events: all;
    }
  }

  .rotating-circles {
    transition: all 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: translate(457px, 467px) rotate(0deg);
  }

  .main-circle {
    path {
      fill: var(--circle-fill-color);
      stroke: var(--circle-stroke-color);
      stroke-width: 2;
      cursor: pointer;
      transition: fill 0.25s ease-out;
    }

    path:hover {
      stroke: var(--circle-accent-color);
      stroke-width: 8;
    }
  }

  .outer-circle {
    path {
      fill: var(--outer-circle-fill-color);
      stroke: var(--circle-stroke-color);
      stroke-width: 2;
    }

    .tonic-segment {
      fill: var(--circle-accent-color);
      fill-opacity: 1;
    }
  }

  .inner-circle {
    path {
      fill: var(--inner-circle-fill-color);
      stroke: var(--circle-stroke-color);
      stroke-width: 2;
    }

    text {
      opacity: 0.5;
    }
  }
}
</style>
