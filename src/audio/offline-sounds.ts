import abcjs, { SynthOptions, TuneObject } from 'abcjs';
import { soundCacheName, soundFontUrl } from '@/audio/soundfont';

// iOS reports an installed web app through navigator.standalone, other browsers through the display mode
export const isInstalledAsApp = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const sampleUrl = (program: number, pitch: number) => {
  const instrumentName = abcjs.synth.instrumentIndexToName[program];
  const noteName = abcjs.synth.pitchToNoteName[pitch];

  return instrumentName && noteName ? `${soundFontUrl}${instrumentName}-mp3/${noteName}.mp3` : null;
};

// Uses the same flattening abcjs plays from, so the urls match exactly what playback requests
const collectSampleUrls = (tunes: TuneObject[], audioParams: SynthOptions) => {
  const urls = new Set<string>();

  for (const tune of tunes) {
    for (const track of tune.setUpAudio(audioParams).tracks) {
      for (const event of track) {
        // Drum pitches come through as strings
        const url = event.cmd === 'note' ? sampleUrl(event.instrument, Number(event.pitch)) : null;
        if (url) {
          urls.add(url);
        }
      }
    }
  }

  return urls;
};

// Writes straight into the cache the service worker reads from,
// so this also works on the first launch, before the service worker controls the page.
export const cacheSoundsForOffline = async (tunes: TuneObject[], audioParamsList: SynthOptions[]) => {
  if (!('caches' in window)) {
    return;
  }

  const urls = new Set(audioParamsList.flatMap((audioParams) => [...collectSampleUrls(tunes, audioParams)]));
  const cache = await caches.open(soundCacheName);
  const cachedUrls = new Set((await cache.keys()).map((request) => request.url));
  const missingUrls = [...urls].filter((url) => !cachedUrls.has(url));

  // One at a time, so the download does not compete with the samples needed for playing right now
  for (const url of missingUrls) {
    await cache.add(url);
  }
};
