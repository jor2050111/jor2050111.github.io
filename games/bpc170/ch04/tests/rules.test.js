import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, jobs, preview, advance, outcome, hint } from '../rules.js';
import { programs } from '../levels.js';

const play = (state, program, ...assignments) => advance(state, { program, jobs: assignments });
const bootFirst = [
  ['interview', 'inspect'], ['vinyl', 'recover'], ['mix', 'copy'],
  ['interview', 'trace'], ['reel', 'cable'], ['band'],
];
const lateFirst = [
  ['interview', 'inspect'], ['vinyl', 'recover'], ['mix', 'copy'],
  ['reel'], ['interview', 'trace'], ['band'],
];
const backupFirstLate = [
  ['ident', 'copy'], ['interview', 'inspect'], ['vinyl', 'recover'],
  ['reel'], ['interview', 'trace'], ['band'],
];
const backupFirstEarly = [
  ['ident', 'copy'], ['interview', 'inspect'], ['vinyl', 'recover'],
  ['interview', 'trace'], ['reel', 'cable'], ['band'],
];
const run = (shift, steps) => steps.reduce((state, step) => play(state, ...step), createState(shift));

for (const [shift, plans] of [['late', [lateFirst, backupFirstLate]], ['early', [bootFirst, backupFirstEarly]]]) {
  for (const [index, steps] of plans.entries()) test(`${shift}: strategy ${index + 1} fills six blocks, shares all three categories, and protects the archive`, () => {
    const end = run(shift, steps);
    assert.equal(outcome(end).success, true);
    assert.equal(end.archive, false);
    assert.equal(end.saved, true);
    assert.equal(end.aired.length, 6);
  });
}

test('independent sources work while playback is down', () => {
  for (const program of programs) assert.equal(
    preview(createState(), { program: program.id, jobs: [] }).ready,
    program.source === 'live',
  );
});
test('live production and jobs share the same two people', () => {
  assert.throws(() => play(createState(), 'band', 'inspect'), /needs 3 crew/);
  assert.throws(() => play(createState(), 'interview', 'copy'), /needs 3 crew/);
  assert.equal(play(createState(), 'ident', 'copy').saved, true);
});
test('repair needs earlier evidence and cannot repair the currently airing block', () => {
  assert.throws(() => play(createState(), 'ident', 'recover'), /earlier block/);
  assert.throws(() => play(createState(), 'ident', 'inspect', 'recover'), /earlier block/);
  const inspected = play(createState(), 'interview', 'inspect');
  const recovered = play(inspected, 'reel', 'recover');
  assert.equal(recovered.pc, true);
  assert.equal(recovered.last.aired, false);
  assert.equal(preview(recovered, { program: 'reel', jobs: [] }).ready, true);
});
test('backup on the failure block completes before the drive event', () => {
  let state = play(createState(), 'interview', 'inspect');
  state = play(state, 'vinyl', 'recover');
  state = play(state, 'mix', 'copy');
  assert.equal(state.saved, true);
  assert.equal(state.archive, false);
  assert.equal(preview(state, { program: 'reel', jobs: [] }).ready, true);
});
test('a degraded mirror cannot survive its remaining drive failing without a separate copy', () => {
  let state = play(createState(), 'interview', 'inspect');
  state = play(state, 'vinyl', 'recover');
  state = play(state, 'mix');
  assert.equal(state.archive, false);
  assert.equal(preview(state, { program: 'reel', jobs: [] }).ready, false);
  assert.equal(preview(state, { program: 'mix', jobs: [] }).ready, true);
  assert.throws(() => play(state, 'ident', 'copy'), /cannot recover/);
});
test('a dark preview leaves the PC running and the independent sources usable', () => {
  let state = run('early', bootFirst.slice(0, 3));
  assert.equal(state.display, 'dark');
  assert.equal(state.pc, true);
  assert.equal(preview(state, { program: 'mix', jobs: [] }).ready, false);
  assert.equal(preview(state, { program: 'interview', jobs: [] }).ready, true);
  state = play(state, 'interview', 'trace');
  assert.equal(state.display, 'isolated');
  assert.equal(preview(state, { program: 'reel', jobs: [] }).ready, true);
  const repaired = play(state, 'reel', 'cable');
  assert.equal(repaired.display, 'clear');
  assert.equal(repaired.pc, true);
  assert.match(repaired.last.notes.join(' '), /Only the preview cable changed/);
});
test('a return test cannot claim PC output before startup is recovered', () => {
  const state = run('early', [['band'], ['band'], ['band']]);
  assert.equal(state.pc, false);
  assert.equal(jobs(state).find(job => job.id === 'trace').available, false);
  assert.throws(() => play(state, 'interview', 'trace'), /Recover and verify/);
  const afterFailure = play(state, 'band');
  assert.match(hint(afterFailure), /read startup evidence/);
});
test('empty blocks and an imperfect full shift still reach an honest ending', () => {
  const end = run('late', Array.from({ length: 6 }, () => ['reel']));
  assert.equal(outcome(end).complete, true);
  assert.equal(outcome(end).clear, 0);
  assert.equal(outcome(end).success, false);
});
test('six idents keep the signal without satisfying the program variety goal', () => {
  const end = run('late', [['ident', 'copy'], ...Array.from({ length: 5 }, () => ['ident'])]);
  assert.equal(outcome(end).clear, 6);
  assert.equal(outcome(end).variety.length, 0);
  assert.equal(outcome(end).success, false);
});
test('invalid plans and completed-shift mutations are rejected', () => {
  assert.throws(() => createState('unknown'), /Unknown shift/);
  assert.throws(() => play(createState(), 'unknown'), /Choose a program/);
  assert.throws(() => play(createState(), 'ident', 'inspect', 'inspect'), /only once/);
  assert.throws(() => play(createState(), 'ident', 'unknown'), /Unknown crew/);
  assert.throws(() => advance(createState(), { program: 'ident', jobs: null }), /list/);
  assert.throws(() => play(run('late', lateFirst), 'ident'), /ended/);
});
test('rules do not mutate their inputs, including nested replay history', () => {
  const state = run('late', lateFirst.slice(0, 2));
  const before = structuredClone(state);
  const plan = { program: 'mix', jobs: ['copy'] };
  const next = advance(state, plan);
  next.log[0].notes.push('changed copy');
  next.last.jobs.push('changed copy');
  assert.deepEqual(state, before);
  assert.deepEqual(plan, { program: 'mix', jobs: ['copy'] });
});
