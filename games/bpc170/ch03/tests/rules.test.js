import test from 'node:test';
import assert from 'node:assert/strict';
import { initialBuild } from '../levels.js';
import { evaluate } from '../rules.js';

const build = changes => ({ ...initialBuild(), ...changes });

test('the starting build has a recoverable airflow limit', () => {
  const result = evaluate(initialBuild());
  assert.equal(result.full, false);
  assert.equal(result.badge, null);
  assert.match(result.advice, /cable bundle/);
});
test('clearing an obstruction improves exchange without adding noise', () => {
  const before = evaluate(initialBuild());
  const after = evaluate(build({ tidy: true }));
  assert.ok(after.caseCapacity > before.caseCapacity);
  assert.equal(after.noise, before.noise);
});
test('paired intake and exhaust outperform same-direction fans', () => {
  const together = evaluate(build({ tidy: true }));
  const through = evaluate(build({ tidy: true, rear: 'out' }));
  assert.ok(through.caseCapacity > together.caseCapacity);
  assert.equal(through.active, together.active);
});
test('passive ventilation does not vanish when all fans are off', () => {
  const result = evaluate(build({ front: 'off', rear: 'off', top: 'off' }));
  assert.equal(result.caseCapacity, 14);
  assert.equal(result.full, false);
});
test('fan speed trades increased case cooling for increased noise', () => {
  const base = { tidy: true, rear: 'out', cooler: 'tower' };
  const low = evaluate(build({ ...base, speed: 'quiet' }));
  const high = evaluate(build({ ...base, speed: 'boost' }));
  assert.ok(high.caseCapacity > low.caseCapacity);
  assert.notEqual(high.noise, low.noise);
});
test('a large cooler cannot fix a crowded, weak air path', () => {
  const compact = evaluate(initialBuild());
  const tower = evaluate(build({ cooler: 'tower' }));
  assert.equal(compact.capacity, tower.capacity);
  assert.equal(tower.bottleneck, 'airflow');
});
test('more case airflow cannot overcome the compact cooler limit', () => {
  const result = evaluate(build({ tidy: true, rear: 'out', top: 'out', speed: 'boost', workload: 'render' }));
  assert.ok(result.caseCapacity > result.coolerCapacity);
  assert.equal(result.capacity, 55);
  assert.equal(result.full, false);
  assert.match(result.advice, /CPU cooler/);
});
test('all three discoveries have meaningful successful configurations', () => {
  assert.equal(evaluate(build({ tidy: true, rear: 'out' })).badge, 'light');
  assert.equal(evaluate(build({ tidy: true, rear: 'out', speed: 'balanced', workload: 'studio' })).badge, 'studio');
  assert.equal(evaluate(build({ tidy: true, rear: 'out', top: 'out', speed: 'boost', cooler: 'tower', workload: 'render' })).badge, 'render');
});
test('alternate directions and fan positions are accepted', () => {
  for (const fans of [
    { front: 'out', rear: 'in', top: 'off' },
    { front: 'in', rear: 'off', top: 'out' },
    { front: 'off', rear: 'in', top: 'out' },
  ]) assert.equal(evaluate(build({ ...fans, tidy: true })).badge, 'light');
});
test('a noisy light build runs but does not earn the quiet discovery', () => {
  const result = evaluate(build({ tidy: true, rear: 'out', speed: 'boost', cooler: 'tower' }));
  assert.equal(result.full, true);
  assert.equal(result.badge, null);
});
test('workload changes demand, not the installed cooling capacity', () => {
  const light = evaluate(build({ tidy: true, rear: 'out' }));
  const render = evaluate(build({ tidy: true, rear: 'out', workload: 'render' }));
  assert.equal(light.capacity, render.capacity);
  assert.ok(render.demand > light.demand);
  assert.equal(render.full, false);
});
test('invalid states are rejected and evaluation never mutates its input', () => {
  for (const change of [{ top: 'sideways' }, { speed: 'turbo' }, { cooler: 'ice' }, { workload: 'unknown' }, { tidy: 'yes' }]) {
    assert.throws(() => evaluate(build(change)));
  }
  const state = Object.freeze(initialBuild());
  evaluate(state);
  assert.deepEqual(state, initialBuild());
});
