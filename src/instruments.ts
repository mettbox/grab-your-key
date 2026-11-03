// General MIDI program numbers
export const instruments = [
  { program: 0, name: 'Grand Piano' },
  { program: 1, name: 'Bright Piano' },
  { program: 4, name: 'Rhodes' },
  { program: 5, name: 'FM Piano' },
  { program: 90, name: 'Polysynth' },
];

const storageKey = 'instrument';

// Falls back to the first instrument when nothing is stored yet or the stored one was removed from the list
export const loadInstrument = () => {
  const storedProgram = Number(localStorage.getItem(storageKey));
  const isKnown = instruments.some(({ program }) => program === storedProgram);

  return isKnown ? storedProgram : instruments[0].program;
};

export const saveInstrument = (program: number) => {
  localStorage.setItem(storageKey, String(program));
};
