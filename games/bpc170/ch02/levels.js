// Capability lists keep connector shape separate from transfer modes.
const usbModes = [0.48, 5, 10];
const endpoint = () => ({ connector: 'USB-C', modes: [...usbModes] });

export const cables = [
  { id: 'a', name: 'Cable A', connector: 'USB-C', modes: [0.48, 5], label: '5 Gbps', description: 'USB-C at both ends. Supports USB transfers up to 5 Gbps.' },
  { id: 'b', name: 'Cable B', connector: 'USB-C', modes: [0.48], label: '480 Mbps', description: 'USB-C at both ends. Supports USB 2.0 transfers up to 480 Mbps.' },
];

export const encounter = {
  id: 'opening-night',
  stations: [
    { id: 'mural', number: '01', title: 'Motion mural', file: 'The mural animation', sizeGB: 2, targetSeconds: 4, host: endpoint(), device: endpoint(), success: 'The mural is ready to move.' },
    { id: 'stage', number: '02', title: 'Music stage', file: 'The stage visuals', sizeGB: 0.5, targetSeconds: 10, host: endpoint(), device: endpoint(), success: 'The stage visuals are ready.' },
  ],
};
