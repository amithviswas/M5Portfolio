
"use client"; // Tone.js interacts with browser AudioContext

import * as Tone from 'tone';

// Define synth configurations
const synthConfigs = {
  hoverChime: {
    synth: Tone.Synth,
    options: {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.05, release: 0.2 },
    },
    volume: -20, // Quieter chime
    defaultNote: 'C5',
    defaultDuration: '16n', // Shorter chime
  },
  electricCrackle: {
    synth: Tone.NoiseSynth,
    options: {
      noise: { type: 'white' },
      envelope: { attack: 0.005, decay: 0.02, sustain: 0, release: 0.02 },
    },
    volume: -30, // Quieter crackle
    defaultDuration: '32n', // Very short crackle
  },
  timelineRumble: {
    synth: Tone.MembraneSynth,
    options: {
      pitchDecay: 0.08,
      octaves: 2,
      oscillator: { type: 'triangle8' }, // Slightly different timbre
      envelope: { attack: 0.02, decay: 0.5, sustain: 0.01, release: 1.5, attackCurve: 'exponential' as const },
    },
    volume: -18, // Audible but not overpowering rumble
    defaultNote: 'A1', // Lower rumble
    defaultDuration: '1n',
  },
  alienStartup: {
    synth: Tone.FMSynth,
    options: {
      harmonicity: 2.5,
      modulationIndex: 12,
      detune: 0,
      oscillator: { type: 'sawtooth' as const },
      envelope: { attack: 0.02, decay: 0.2, sustain: 0.4, release: 1.2 },
      modulation: { type: 'sine' as const },
      modulationEnvelope: { attack: 0.6, decay: 0.1, sustain: 1, release: 0.6 },
    },
    volume: -15,
    defaultNote: 'G3',
    defaultDuration: '0.8n', // Slightly shorter startup
  },
};

type SynthName = keyof typeof synthConfigs;

// Initialize synths
const synths: Partial<Record<SynthName, Tone.Synth | Tone.NoiseSynth | Tone.MembraneSynth | Tone.FMSynth>> = {};

function initializeSynths() {
  if (typeof window === 'undefined') return; // Don't run on server

  for (const key in synthConfigs) {
    const name = key as SynthName;
    const config = synthConfigs[name];
    // @ts-ignore TODO: Fix this type issue more elegantly
    synths[name] = new config.synth(config.options).toDestination();
    if (synths[name]) {
      // @ts-ignore
      synths[name].volume.value = config.volume;
    }
  }
}

// Call initializeSynths only on the client side
if (typeof window !== "undefined") {
  initializeSynths();
}


let audioContextStarted = false;

const ensureAudioContextStarted = async () => {
  if (typeof window !== 'undefined' && !audioContextStarted && Tone.context.state !== 'running') {
    try {
      await Tone.start();
      audioContextStarted = true;
      console.log('XenoSoundProtocol: AudioContext started.');
    } catch (e) {
      console.error("XenoSoundProtocol: Error starting AudioContext", e);
    }
  }
};

interface SoundService {
  playSound: (soundName: SynthName, options?: { time?: string | number, note?: string, duration?: string | number }) => void;
  startContext: () => Promise<void>;
  isAudioContextStarted: () => boolean;
}

const soundService: SoundService = {
  playSound: (soundName, options) => {
    if (typeof window === 'undefined' || !audioContextStarted) {
      // console.log(`XenoSoundProtocol: Audio context not started or not in browser. Sound ${soundName} not played.`);
      return;
    }

    const synthInstance = synths[soundName];
    const config = synthConfigs[soundName];

    if (synthInstance && config) {
      const note = options?.note || config.defaultNote;
      const duration = options?.duration || config.defaultDuration;
      const time = options?.time; // Can be undefined for immediate play

      try {
        if (synthInstance instanceof Tone.Synth || synthInstance instanceof Tone.FMSynth || synthInstance instanceof Tone.MembraneSynth) {
          synthInstance.triggerAttackRelease(note as Tone.Unit.Frequency, duration as Tone.Unit.Time, time);
        } else if (synthInstance instanceof Tone.NoiseSynth) {
          synthInstance.triggerAttackRelease(duration as Tone.Unit.Time, time);
        }
      } catch (e) {
        console.error(`XenoSoundProtocol: Error playing sound ${soundName}`, e);
      }
    } else {
      console.warn(`XenoSoundProtocol: Sound ${soundName} not found or not initialized.`);
    }
  },
  startContext: async () => {
    await ensureAudioContextStarted();
  },
  isAudioContextStarted: () => audioContextStarted,
};

export default soundService;
