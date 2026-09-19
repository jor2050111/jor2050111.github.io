export const workloads = Object.freeze({
  light: { name: 'Writing desk', demand: 30, detail: 'Notes, research, a little music.', badge: 'Quiet Creator' },
  studio: { name: 'Photo studio', demand: 55, detail: 'Layers, previews, and larger files.', badge: 'Studio Steady' },
  render: { name: 'Animation render', demand: 80, detail: 'A sustained, demanding CPU workload.', badge: 'Heavy Lifter' },
});

export const speeds = Object.freeze({
  quiet: { name: 'Quiet', flow: 0.8, noise: 1 },
  balanced: { name: 'Balanced', flow: 1.1, noise: 2 },
  boost: { name: 'Boost', flow: 1.45, noise: 3 },
});

export const coolers = Object.freeze({
  compact: { name: 'Compact cooler', capacity: 55, noise: 0 },
  tower: { name: 'Tower cooler', capacity: 90, noise: 1 },
});

export function initialBuild() {
  return { workload: 'light', front: 'in', rear: 'in', top: 'off', speed: 'quiet', cooler: 'compact', tidy: false };
}

export const goals = [
  { id: 'light', name: 'Quiet Creator', description: 'Writing desk · full pace · low fan noise' },
  { id: 'studio', name: 'Studio Steady', description: 'Photo studio · full pace' },
  { id: 'render', name: 'Heavy Lifter', description: 'Animation render · full pace' },
];
