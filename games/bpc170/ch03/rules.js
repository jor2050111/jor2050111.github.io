import { workloads, speeds, coolers } from './levels.js';

// These dimensionless coefficients are authored game rules, not thermal data.
// Passive vents preserve some exchange even without paired intake/exhaust fans.
export function evaluate(build) {
  for (const key of ['front', 'rear', 'top']) {
    if (!['in', 'out', 'off'].includes(build[key])) throw new Error('Unknown fan direction');
  }
  if (!Object.hasOwn(workloads, build.workload) || !Object.hasOwn(speeds, build.speed)
      || !Object.hasOwn(coolers, build.cooler) || typeof build.tidy !== 'boolean') {
    throw new Error('Invalid build');
  }
  const fans = [build.front, build.rear, build.top];
  const intake = fans.filter(value => value === 'in').length;
  const exhaust = fans.filter(value => value === 'out').length;
  const active = intake + exhaust;
  const exchange = (0.6 * Math.max(intake, exhaust) + Math.min(intake, exhaust))
    * speeds[build.speed].flow * (build.tidy ? 1 : 0.6);
  const caseCapacity = Math.round(14 + exchange * 24);
  const coolerCapacity = coolers[build.cooler].capacity;
  const capacity = Math.min(caseCapacity, coolerCapacity);
  const demand = workloads[build.workload].demand;
  const noiseScore = active * speeds[build.speed].noise + coolers[build.cooler].noise;
  const noise = noiseScore <= 3 ? 'Low' : noiseScore <= 6 ? 'Medium' : 'High';
  const full = capacity >= demand;
  const thermal = full ? (capacity - demand >= 12 ? 'Cool' : 'Warm, stable') : 'Heat-limited';
  const bottleneck = caseCapacity < coolerCapacity ? 'airflow' : 'cooler';
  const badge = full && (build.workload !== 'light' || noise === 'Low') ? build.workload : null;
  let advice;
  if (!full && bottleneck === 'cooler') {
    advice = 'The CPU cooler is the limit. Faster case fans alone cannot carry more heat away from this CPU. Try the tower cooler or a lighter workload.';
  } else if (!full && !build.tidy) {
    advice = 'The cable bundle crowds the air path. Clear it, then compare the same workload again.';
  } else if (!full && (!intake || !exhaust)) {
    advice = 'Air is relying on passive vents for part of its trip. Try an intake and an exhaust to make a stronger path through this case.';
  } else if (!full) {
    advice = 'This workload needs more cooling. Try another active fan or a faster fan setting. Watch the noise tradeoff.';
  } else if (build.workload === 'light' && noise !== 'Low') {
    advice = 'Full pace, with cooling to spare. Can you keep this light workload comfortable with less fan noise?';
  } else {
    advice = 'This build handles the workload. Try another fan arrangement or workload and compare what changes.';
  }
  return { intake, exhaust, active, caseCapacity, coolerCapacity, capacity, demand,
    noise, full, thermal, bottleneck, badge, advice };
}
