type AudioSessionNavigator = Navigator & { audioSession?: { type: string } };

// iOS treats web audio like a ringtone by default, so the ring/silent switch mutes it.
// A "playback" session makes it behave like a music player instead. Only Safari 17+ has this API.
export const allowPlaybackInSilentMode = () => {
  const audioSession = (navigator as AudioSessionNavigator).audioSession;
  if (audioSession) {
    audioSession.type = 'playback';
  }
};
