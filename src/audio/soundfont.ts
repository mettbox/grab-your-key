// Shared with vite.config.ts, so it must not import anything that needs a browser.

// The abcjs default soundfont. abcjs only applies its volume boost when the URL matches exactly.
export const soundFontUrl = 'https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/';

// The service worker serves the samples from this cache, and the offline download fills it.
export const soundCacheName = 'soundfont-cache';
