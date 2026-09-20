import { shifts, programs, categories, BLOCKS } from './levels.js';

export function createState(shift = 'late') {
  if (!Object.hasOwn(shifts, shift)) throw new Error('Unknown shift');
  return { shift, round: 0, inspected: false, pc: false, saved: false,
    archive: true, display: 'clear', aired: [], log: [], last: null };
}

export function jobs(state) {
  return [
    { id: 'inspect', title: 'Read the startup evidence', cost: 1,
      detail: 'Follow power, POST, and boot messages before changing anything.',
      available: !state.inspected && !state.pc, reason: 'Startup evidence already collected.' },
    { id: 'recover', title: 'Recover and verify playback', cost: 1,
      detail: state.inspected ? shifts[state.shift].repair : 'Read the startup evidence first to choose the repair.',
      available: state.inspected && !state.pc, reason: state.pc ? 'Playback already verified.' : 'Collect startup evidence in an earlier block.' },
    { id: 'copy', title: 'Protect the film archive', cost: 2,
      detail: 'Copy the readable archive to separate storage and verify the copy. This does not need the playback PC.',
      available: state.archive && !state.saved,
      reason: state.saved ? 'A separate verified copy is safe.' : 'The archive is offline. A new copy cannot recover unreadable data.' },
    { id: 'trace', title: 'Check the transmitter return', cost: 1,
      detail: 'Compare the independent return feed with the dark preview. Keep the running PC unchanged.',
      available: state.display === 'dark' && state.pc,
      reason: !state.pc ? 'Recover and verify the playback PC before testing its preview path.' : 'No untested preview fault right now.' },
    { id: 'cable', title: 'Test a known-good preview cable', cost: 1,
      detail: 'Keep the same monitor, input, and source. Change only its cable, then check the picture.',
      available: state.display === 'isolated', reason: 'Isolate the preview path with the return feed first.' },
  ];
}

export function readiness(state, program) {
  if (program.source === 'live') return { ready: true, message: 'Independent source. Ready to air.' };
  if (!state.pc) return { ready: false, message: 'Playback is down. This choice will leave an empty block.' };
  if (program.source === 'archive' && !state.archive && !state.saved) {
    return { ready: false, message: 'The archive is offline with no separate copy. This block will be empty.' };
  }
  if (state.display === 'dark') return { ready: false,
    message: 'The preview is dark. Station policy holds recorded clips until the return feed is checked. Choose a live source while crew isolates it.' };
  return { ready: true, message: state.display === 'isolated'
    ? 'Return feed verified. Playback can air while the preview cable is repaired.'
    : program.source === 'archive' && !state.archive ? 'Playing from the separate verified copy.' : 'Playback verified. Ready to air.' };
}

export function preview(state, plan) {
  const program = programs.find(item => item.id === plan.program);
  const errors = [];
  if (state.round >= BLOCKS) errors.push('This shift has ended. Rewind or start another.');
  if (!program) errors.push('Choose a program for this block.');
  const selected = Array.isArray(plan.jobs) ? plan.jobs : [];
  if (!Array.isArray(plan.jobs)) errors.push('Crew assignments must be a list.');
  if (new Set(selected).size !== selected.length) errors.push('Assign each job only once.');
  const options = jobs(state);
  for (const id of selected) {
    const job = options.find(item => item.id === id);
    if (!job) errors.push('Unknown crew assignment.');
    else if (!job.available) errors.push(job.reason);
  }
  const used = (program?.crew ?? 0) + selected.reduce((sum, id) => sum + (options.find(item => item.id === id)?.cost ?? 0), 0);
  if (used > 2) errors.push(`This plan needs ${used} crew members. You have two. Change the program or remove a job.`);
  return { program, used, errors, ...(program ? readiness(state, program) : { ready: false, message: 'Choose a program.' }) };
}

export function advance(state, plan) {
  const check = preview(state, plan);
  if (check.errors.length) throw new Error(check.errors.join(' '));
  const next = structuredClone(state);
  const notes = [];
  const program = check.program;
  const entry = { block: state.round + 1, program: program.id, title: program.title,
    aired: check.ready, category: check.ready ? program.category : null,
    jobs: [...plan.jobs], notes };
  // Jobs finish after the current program, so a repair cannot rescue this block.
  if (check.ready) notes.push(`${program.title} aired. ${program.crew} crew on production.`);
  else notes.push(`Empty block. ${check.message}`);
  for (const id of plan.jobs) {
    if (id === 'inspect') {
      next.inspected = true;
      notes.push(shifts[state.shift].evidence);
    } else if (id === 'recover') {
      next.pc = true;
      notes.push(`${shifts[state.shift].repair}. Successful startup and test output verified. Playback is available next block.`);
    } else if (id === 'copy') {
      next.saved = true;
      notes.push('Archive copied to separate storage. A test restore verified it. The source array is still degraded.');
    } else if (id === 'trace') {
      next.display = 'isolated';
      notes.push('The independent return shows the expected PC test image. The monitor has power and the correct input. The local preview path is suspect, not an OS boot failure. Recorded programs are cleared for the next block.');
    } else if (id === 'cable') {
      next.display = 'clear';
      notes.push('Only the preview cable changed. The picture returned with the same source, input, and monitor. The original cable is the fault.');
    }
  }
  next.round++;
  const shift = shifts[state.shift];
  if (next.round === shift.archiveAt) {
    next.archive = false;
    notes.push(next.saved
      ? 'Scheduled event: the remaining archive drive failed. The mirrored volume is offline, but your separate verified copy keeps the films available.'
      : 'Scheduled event: the remaining archive drive failed. The mirrored volume is offline. No separate copy exists, so the films are unavailable this shift. Rewind to try protecting them earlier.');
  }
  if (next.round === shift.displayAt) {
    next.display = 'dark';
    notes.push('Scheduled event: the local preview went dark. This alone does not prove the PC stopped. Live sources still work. Compare the independent return feed.');
  }
  next.aired.push(entry);
  next.log.push(entry);
  next.last = entry;
  return next;
}

export function outcome(state) {
  const seen = new Set(state.aired.map(item => item.category).filter(Boolean));
  const clear = state.aired.filter(item => item.aired).length;
  const variety = Object.keys(categories).filter(id => seen.has(id));
  return { clear, variety, saved: state.saved,
    complete: state.round === BLOCKS,
    success: state.round === BLOCKS && clear === BLOCKS && variety.length === 3 && state.saved,
  };
}

export function hint(state) {
  const until = shifts[state.shift].archiveAt - state.round;
  if (!state.saved && state.archive && until <= 1) return 'The archive failure follows this block. Protecting it takes both crew. The station ident frees both; a working local playback mix also does. Copying finishes before the scheduled event.';
  if (state.display === 'dark' && state.pc) return 'A dark local preview does not tell you what viewers receive. A live conversation or turntable set leaves one crew member to check the return feed.';
  if (!state.inspected) return 'You can protect the archive first with both crew, or air a live conversation and send one person to read startup evidence. Both openings can work.';
  if (!state.pc) return 'Your startup evidence identifies a repair. A live conversation or turntable set leaves one person to recover and verify playback for the next block.';
  if (!state.saved && state.archive) return 'Recorded music on the healthy playback PC frees both crew to protect the separate film archive.';
  if (!outcome(state).variety.includes('film') && (state.archive || state.saved)) return 'Your viewers have not seen a film yet. Once playback is cleared, Small moon, big plans can use the archive or its separate copy.';
  return 'Try a different running order. A full live band occupies both crew. Recorded programs leave them free. Rewind lets you compare a decision without losing the whole shift.';
}
