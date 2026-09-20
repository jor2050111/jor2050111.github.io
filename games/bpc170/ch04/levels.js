export const shifts = {
  late: {
    name: 'The late shift', subtitle: 'A boot mystery. An archive on borrowed time.',
    fault: 'boot', archiveAt: 3, displayAt: 4,
    opening: 'The playback PC has power but cannot load its OS. Your live studio and turntables are independent. The film archive is degraded: one mirrored drive has already failed.',
    evidence: 'POST completed. The OS disk is detected. The saved boot entry targets a removed disk. A valid internal OS entry is available. This is a boot selection fault, not evidence of a dead drive.',
    repair: 'Select the valid internal boot entry, then verify two starts',
  },
  early: {
    name: 'The early show', subtitle: 'A POST mystery. A preview that goes dark sooner.',
    fault: 'post', archiveAt: 4, displayAt: 3,
    opening: 'The playback PC powers on but stops before POST completes after a memory upgrade. Your live studio and turntables still work. One drive in the mirrored film archive has failed.',
    evidence: 'POST does not complete. The service log records a memory upgrade. This fictional board’s own code guide identifies its memory indicator. A powered-off inspection finds a loose RAM module. Fans alone do not clear the PSU.',
    repair: 'Power down, reseat the loose RAM, then verify startup',
  },
};

export const programs = [
  { id: 'interview', title: 'People after dark', type: 'Live conversation', category: 'story', crew: 1, source: 'live', art: 'talk',
    description: 'A baker, a night driver, a tiny story worth telling. One crew member runs the studio.' },
  { id: 'band', title: 'Electric rooftop', type: 'Live music session', category: 'music', crew: 2, source: 'live', art: 'band',
    description: 'The band is ready. Both crew members handle cameras and sound. Repairs wait this block.' },
  { id: 'vinyl', title: 'The record room', type: 'Turntable set', category: 'music', crew: 1, source: 'live', art: 'vinyl',
    description: 'One host, two turntables. An independent music source that leaves one crew member free.' },
  { id: 'reel', title: 'Small moon, big plans', type: 'Archive short film', category: 'film', crew: 0, source: 'archive', art: 'moon',
    description: 'An astronaut’s homemade rocket. Needs the playback PC and accessible archive footage.' },
  { id: 'tape', title: 'City in miniature', type: 'Recorded story', category: 'story', crew: 0, source: 'archive', art: 'city',
    description: 'A model-maker’s impossible little city. Needs the playback PC and accessible archive footage.' },
  { id: 'mix', title: 'Midnight frequencies', type: 'Local playback mix', category: 'music', crew: 0, source: 'pc', art: 'wave',
    description: 'Music already on the PC’s healthy internal disk. Frees both crew members once playback works.' },
  { id: 'ident', title: 'A little station magic', type: 'Independent station ident', category: null, crew: 0, source: 'live', art: 'ident',
    description: 'A cheerful looping station animation. Keeps a signal on air and frees both crew, but adds no story, music, or film.' },
];

export const categories = { story: 'A human story', music: 'Some good music', film: 'A little cinema' };
export const BLOCKS = 6;
