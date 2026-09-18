export function transfer(station, cable) {
  if (!cable) return { kind: 'empty', meetsTarget: false };
  const parts = [station.host, cable, station.device];
  if (parts.some(part => part.connector !== cable.connector)) {
    return { kind: 'incompatible', reason: 'These connectors do not fit.', meetsTarget: false };
  }
  const shared = parts[0].modes.filter(mode => parts.every(part => part.modes.includes(mode)));
  if (!shared.length) {
    return { kind: 'incompatible', reason: 'These devices share no supported transfer mode.', meetsTarget: false };
  }
  const rate = Math.max(...shared);
  const seconds = station.sizeGB * 8 / rate;
  const names = ['host port', 'cable', 'destination'];
  const bottlenecks = parts.flatMap((part, index) => Math.max(...part.modes) === rate ? [names[index]] : []);
  return { kind: 'connected', rate, seconds, bottlenecks, meetsTarget: seconds <= station.targetSeconds };
}

// Moving a cable swaps assignments when possible. Inventory cannot duplicate.
export function assignCable(assignments, stationId, cableId) {
  const next = { ...assignments };
  const previousStation = Object.keys(next).find(id => next[id] === cableId);
  if (previousStation === stationId) return next;
  if (previousStation) next[previousStation] = next[stationId] ?? null;
  next[stationId] = cableId;
  return next;
}

export function evaluate(stations, inventory, assignments) {
  const used = Object.values(assignments).filter(Boolean);
  if (new Set(used).size !== used.length) throw new Error('A cable cannot serve two stations.');
  const outcomes = Object.fromEntries(stations.map(station => {
    const cableId = assignments[station.id];
    const cable = inventory.find(item => item.id === cableId);
    if (cableId && !cable) throw new Error('Unknown cable.');
    return [station.id, transfer(station, cable)];
  }));
  return { outcomes, complete: Object.values(outcomes).every(result => result.meetsTarget) };
}

export function formatSeconds(value) {
  return new Intl.NumberFormat('en', { maximumFractionDigits: 1 }).format(value);
}
