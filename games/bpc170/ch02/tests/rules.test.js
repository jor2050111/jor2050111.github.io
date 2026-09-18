import test from 'node:test';
import assert from 'node:assert/strict';
import { cables, encounter } from '../levels.js';
import { assignCable, evaluate, transfer } from '../rules.js';

const mural = encounter.stations[0];
const stage = encounter.stations[1];

test('same-shape cables produce different valid USB transfer rates', () => {
  assert.equal(transfer(mural, cables[0]).seconds, 3.2);
  assert.ok(Math.abs(transfer(mural, cables[1]).seconds - 100 / 3) < 1e-10);
  assert.equal(transfer(mural, cables[0]).meetsTarget, true);
  assert.equal(transfer(mural, cables[1]).meetsTarget, false);
});

test('a smaller file meets its target on the slower cable', () => {
  const result = transfer(stage, cables[1]);
  assert.ok(Math.abs(result.seconds - 25 / 3) < 1e-10);
  assert.equal(result.meetsTarget, true);
});

test('a slow host remains the bottleneck with a fast cable', () => {
  const station = { ...mural, host: { connector: 'USB-C', modes: [0.48] } };
  const result = transfer(station, cables[0]);
  assert.equal(result.rate, 0.48);
  assert.deepEqual(result.bottlenecks, ['host port']);
  assert.equal(result.meetsTarget, false);
});

test('a slow destination remains the bottleneck with a fast host and cable', () => {
  const station = { ...mural, device: { connector: 'USB-C', modes: [0.48] } };
  assert.deepEqual(transfer(station, cables[0]).bottlenecks, ['destination']);
});

test('matching shapes cannot create a shared protocol mode', () => {
  const noSharedMode = { ...cables[0], modes: [20] };
  assert.equal(transfer(mural, noSharedMode).kind, 'incompatible');
});

test('incompatible connectors reject a coincidentally matching rate', () => {
  const differentShape = { ...cables[0], connector: 'USB-A' };
  assert.equal(transfer(mural, differentShape).kind, 'incompatible');
});

test('missing cables are incomplete, not free successful transfers', () => {
  assert.equal(transfer(mural, null).kind, 'empty');
  assert.equal(evaluate(encounter.stations, cables, { mural: 'a', stage: null }).complete, false);
});

test('moving an assigned cable swaps assignments without mutating the prior state', () => {
  const prior = { mural: 'b', stage: 'a' };
  const next = assignCable(prior, 'mural', 'a');
  assert.deepEqual(next, { mural: 'a', stage: 'b' });
  assert.deepEqual(prior, { mural: 'b', stage: 'a' });
  assert.deepEqual(assignCable(next, 'mural', 'a'), next);
});

test('moving a cable into an empty slot frees its former slot', () => {
  assert.deepEqual(assignCable({ mural: 'a', stage: null }, 'stage', 'a'), { mural: null, stage: 'a' });
});

test('duplicate or unknown inventory cannot produce a winning state', () => {
  assert.throws(() => evaluate(encounter.stations, cables, { mural: 'a', stage: 'a' }));
  assert.throws(() => evaluate(encounter.stations, cables, { mural: 'invented', stage: 'b' }));
});

test('the full encounter has a verified solution and a meaningful losing arrangement', () => {
  assert.equal(evaluate(encounter.stations, cables, { mural: 'a', stage: 'b' }).complete, true);
  assert.equal(evaluate(encounter.stations, cables, { mural: 'b', stage: 'a' }).complete, false);
});
