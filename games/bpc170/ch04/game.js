import { shifts, programs, categories, BLOCKS } from './levels.js';
import { createState, jobs, preview, advance, outcome, hint } from './rules.js';

const $ = selector => document.querySelector(selector);
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
let state = createState();
let plan = { program: null, jobs: [] };
let history = [];
let sound = false;
let paused = motionQuery.matches;
let audio;
let nodes = [];
let effectTimer;
const monograms = { talk: 'hello.', band: 'LIVE', vinyl: '33⅓', moon: 'MOON', city: 'MINI', wave: 'FM /', ident: '04' };

function announce(message) { $('#announcer').textContent = message; }
function stopEffects() {
  clearTimeout(effectTimer);
  $('#finish-dialog').classList.remove('celebrate');
  for (const node of nodes) { try { node.stop(); } catch { /* Already stopped. */ } }
  nodes = [];
}
function chime(win = false) {
  if (!sound) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    audio.resume().catch(() => {});
    const tones = win ? [261.63, 329.63, 392, 523.25] : [392, 523.25];
    tones.forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = audio.currentTime + index * .13;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(.04, start + .02);
      gain.gain.exponentialRampToValueAtTime(.001, start + .25);
      oscillator.connect(gain); gain.connect(audio.destination);
      oscillator.start(start); oscillator.stop(start + .3);
      nodes.push(oscillator);
      oscillator.onended = () => {
        oscillator.disconnect(); gain.disconnect();
        nodes = nodes.filter(item => item !== oscillator);
      };
    });
  } catch { /* Optional sound must not block the broadcast. */ }
}

$('#programs').innerHTML = programs.map(program => `<button class="program-card" id="program-${program.id}" aria-pressed="false" data-program="${program.id}">
  <span class="mini-art ${program.art}" aria-hidden="true">${monograms[program.art]}</span>
  <span class="program-copy"><strong>${program.title}</strong><span class="type">${program.type} · ${program.crew} crew</span><span class="description">${program.description}</span><span class="availability"></span></span>
</button>`).join('');
$('#jobs').innerHTML = jobs(state).map(job => `<button class="job" id="job-${job.id}" data-job="${job.id}" aria-pressed="false"><strong>${job.title}</strong><span class="cost">${job.cost} crew</span><span class="detail"></span></button>`).join('');

function renderSettings() {
  const less = paused || motionQuery.matches;
  document.body.classList.toggle('less-motion', less);
  $('#motion').textContent = less ? 'Motion paused' : 'Pause motion';
  $('#motion').setAttribute('aria-pressed', String(less));
  $('#sound').textContent = sound ? 'Sound on' : 'Sound off';
  $('#sound').setAttribute('aria-pressed', String(sound));
}

function renderPlan() {
  const check = preview(state, plan);
  const done = state.round === BLOCKS;
  for (const program of programs) {
    const button = $(`#program-${program.id}`);
    const availability = preview(state, { program: program.id, jobs: [] });
    button.setAttribute('aria-pressed', String(plan.program === program.id));
    button.disabled = done;
    button.querySelector('.availability').textContent = availability.ready ? 'Ready to air' : 'Unavailable · would leave a gap';
    button.querySelector('.availability').classList.toggle('warn', !availability.ready);
  }
  for (const job of jobs(state)) {
    const button = $(`#job-${job.id}`);
    button.setAttribute('aria-pressed', String(plan.jobs.includes(job.id)));
    button.disabled = done || !job.available;
    button.querySelector('.detail').textContent = job.available ? job.detail : job.reason;
  }
  $('#crew-count').textContent = done ? 'Shift complete' : `${check.used} of 2 crew assigned${check.used > 2 ? ' · over capacity' : ''}`;
  $('#plan-title').textContent = done ? 'That’s a wrap.' : check.program ? `Next on Channel 04: ${check.program.title}` : 'Your block is waiting.';
  $('#plan-copy').textContent = done ? 'Open the closing credits, rewind a block, or try another shift.' : check.message;
  $('#plan-error').textContent = check.program && !done ? check.errors.join(' ') : '';
  $('#air').textContent = done ? 'Shift complete' : `Air block ${String(state.round + 1).padStart(2, '0')} ↗`;
  $('#air').setAttribute('aria-disabled', String(done || check.errors.length > 0));
}

function render() {
  const result = outcome(state);
  const shift = shifts[state.shift];
  const done = result.complete;
  document.body.classList.toggle('finished', done && result.success);
  $('#block-count').textContent = done ? 'SHIFT COMPLETE' : `BLOCK ${String(state.round + 1).padStart(2, '0')} / 06`;
  $('#next-block').textContent = done ? 'YOUR NIGHT, ON RECORD' : `BUILD BLOCK ${String(state.round + 1).padStart(2, '0')}`;
  $('#brief').innerHTML = state.last ? `<strong>${state.last.aired ? 'The signal held.' : 'A gap in the broadcast.'}</strong><p>${state.last.notes.at(-1)}</p>` : `<strong>${shift.name}</strong><p>${shift.opening}</p>`;
  const statuses = [
    ['Playback', state.pc ? 'Verified and ready' : state.inspected ? 'Cause identified. Recovery pending.' : 'Startup stalled. Evidence needed.', state.pc],
    ['Film archive', state.saved ? 'Separate copy verified' : state.archive ? 'Degraded mirror. No separate copy.' : 'Offline. No separate copy.', state.saved],
    ['Preview', state.display === 'clear' ? 'Local preview path available' : state.display === 'isolated' ? 'Return verified. Local cable suspect.' : 'Dark. Cause not yet isolated.', state.display !== 'dark'],
  ];
  $('#systems').innerHTML = statuses.map(([title, text, good]) => `<div><dt>${title}</dt><dd><strong class="${good ? '' : 'warning'}">${text}</strong></dd></div>`).join('');
  $('#evidence-copy').textContent = state.inspected ? shift.evidence : 'Assign a crew member to read the startup evidence. Fans and lights alone cannot prove a successful boot.';
  $('#forecast').textContent = `After block ${shift.archiveAt}: the remaining archive drive fails. After block ${shift.displayAt}: the local preview loses its picture. Crew jobs finish before that block’s event.`;
  $('#rundown').innerHTML = Array.from({ length: BLOCKS }, (_, index) => {
    const block = state.aired[index];
    return `<li class="${block ? block.aired ? 'filled' : 'empty' : index === state.round ? 'current' : ''}" ${index === state.round ? 'aria-current="step"' : ''}><b>0${index + 1}</b>${block ? block.aired ? block.title : 'Empty block' : index === state.round ? 'Your next move' : 'To come'}</li>`;
  }).join('');
  $('#wishes').innerHTML = Object.entries(categories).map(([id, name]) => `<li class="${result.variety.includes(id) ? 'done' : ''}">${result.variety.includes(id) ? '✓' : '○'} ${name}</li>`).join('');
  if (state.last) {
    const program = programs.find(item => item.id === state.last.program);
    $('#screen').className = `screen art-${state.last.aired ? program.art : 'off'}`;
    $('#screen').setAttribute('aria-label', state.last.aired ? `Last aired: ${program.title}. ${program.type}.` : 'Empty broadcast block. No program reached viewers.');
    $('#screen-caption').textContent = state.last.aired ? program.title : 'We’ll be right back.';
    $('#screen-kicker').textContent = state.last.aired ? program.type.toUpperCase() : 'EMPTY BLOCK · TRY A DIFFERENT SOURCE';
    $('#screen .station-mark').firstChild.textContent = state.last.aired ? '04' : 'NO SIGNAL';
    $('#live-label').textContent = state.last.aired ? done ? 'SIGNED OFF' : 'AIRED' : 'SIGNAL LOST';
    $('#live-label').classList.toggle('live', state.last.aired);
  } else {
    $('#screen').className = 'screen art-ident';
    $('#screen').setAttribute('aria-label', 'Channel 04 test pattern. The broadcast has not started.');
    $('#screen-caption').textContent = 'Your night. Your running order.';
    $('#screen-kicker').textContent = 'INDEPENDENT TELEVISION';
    $('#screen .station-mark').firstChild.textContent = '04';
    $('#live-label').textContent = 'STANDBY';
    $('#live-label').classList.remove('live');
  }
  $('#undo').disabled = !history.length;
  $('#recap').hidden = !done;
  $('#log').innerHTML = state.log.length ? [...state.log].reverse().map((entry, index) => `<details ${index === 0 ? 'open' : ''}><summary>Block ${entry.block} · ${entry.aired ? entry.title : 'Empty block'}</summary><ul>${entry.notes.map(note => `<li>${note}</li>`).join('')}</ul></details>`).join('') : '<p>Your first broadcast will appear here.</p>';
  renderPlan();
}

function showFinish() {
  const result = outcome(state);
  $('#finish-title').textContent = result.success ? 'You kept the night alive.' : 'Every shift tells a story.';
  $('#finish-copy').textContent = result.success ? 'A story, a soundtrack, a little cinema. Six filled blocks and the archive safe for tomorrow.' : 'Your running order is saved below. Rewind to explore another choice, or replay with a different plan.';
  $('#finish-results').innerHTML = [`${result.clear} of 6 blocks filled`, `${result.variety.length} of 3 program types shared`, result.saved ? 'Archive: separate copy verified' : 'Archive: no separate copy', state.pc ? 'Playback: startup recovered and verified' : 'Playback: startup still needs attention'].map(text => `<li>${text}</li>`).join('');
  $('#finish-lesson').textContent = state.saved ? 'The mirror lost its remaining drive. Your separate copy kept the footage available. Startup evidence identifies the failed stage. An independent return feed can distinguish a preview fault from a stopped PC.' : 'A mirror with one failed drive has no spare copy left inside that pair. Protect readable footage before another failure. An ident can buy the crew a block to do that work.';
  $('#finish-dialog').showModal();
  if (result.success && !(paused || motionQuery.matches)) {
    $('#finish-dialog').classList.add('celebrate');
    effectTimer = setTimeout(() => $('#finish-dialog').classList.remove('celebrate'), 1450);
  }
  chime(result.success);
}

for (const button of document.querySelectorAll('[data-program]')) button.addEventListener('click', () => {
  plan.program = button.dataset.program;
  renderPlan();
  const check = preview(state, plan);
  announce(`${check.program.title}. ${check.used} of 2 crew assigned. ${check.message} ${check.errors.join(' ')}`);
});
for (const button of document.querySelectorAll('[data-job]')) button.addEventListener('click', () => {
  const id = button.dataset.job;
  plan.jobs = plan.jobs.includes(id) ? plan.jobs.filter(item => item !== id) : [...plan.jobs, id];
  renderPlan();
  const check = preview(state, plan);
  announce(`${check.used} of 2 crew assigned. ${check.errors.join(' ')}`);
});
$('#air').addEventListener('click', () => {
  const check = preview(state, plan);
  if (check.errors.length) {
    $('#plan-error').textContent = check.errors.join(' ');
    announce(check.errors.join(' '));
    return;
  }
  stopEffects();
  history.push({ state: structuredClone(state), plan: structuredClone(plan) });
  state = advance(state, plan);
  plan = { program: null, jobs: [] };
  $('#hint-copy').hidden = true;
  render();
  announce(`Block ${state.round} finished. ${state.last.notes.join(' ')}`);
  if (state.round === BLOCKS) showFinish();
  else {
    $('#screen-title').focus({ preventScroll: true });
    $('.watch').scrollIntoView({ block: 'start', behavior: 'instant' });
    chime();
  }
});

function restart(shift = state.shift) {
  stopEffects();
  if ($('#finish-dialog').open) $('#finish-dialog').close();
  state = createState(shift); plan = { program: null, jobs: [] }; history = [];
  $('#shift').value = shift;
  $('#hint-copy').hidden = true;
  $('#evidence').open = false;
  render();
  $('#program-interview').focus();
  announce(`${shifts[shift].name} restarted. Choose a program for block one.`);
}
$('#restart').addEventListener('click', () => restart());
$('#replay').addEventListener('click', () => restart());
$('#new-shift').addEventListener('click', () => restart($('#shift').value));
$('#undo').addEventListener('click', () => {
  const previous = history.pop();
  if (!previous) return;
  stopEffects();
  state = previous.state; plan = previous.plan;
  $('#hint-copy').hidden = true;
  render();
  $(`#program-${plan.program}`).focus();
  announce(`Rewound to block ${state.round + 1}. Your previous plan is selected. Change it or air it again.`);
});
$('#hint').addEventListener('click', () => { $('#hint-copy').textContent = hint(state); $('#hint-copy').hidden = false; announce(hint(state)); });
$('#recap').addEventListener('click', showFinish);
$('#close-finish').addEventListener('click', () => $('#finish-dialog').close());
$('#finish-dialog').addEventListener('close', () => { stopEffects(); if (state.round === BLOCKS) $('#recap').focus(); });
$('#help').addEventListener('click', () => $('#help-dialog').showModal());
$('#close-help').addEventListener('click', () => $('#help-dialog').close());
$('#help-done').addEventListener('click', () => $('#help-dialog').close());
$('#sound').addEventListener('click', () => { sound = !sound; if (!sound) stopEffects(); renderSettings(); if (sound) chime(); });
$('#motion').addEventListener('click', () => { paused = !paused; if (paused || motionQuery.matches) stopEffects(); renderSettings(); });
motionQuery.addEventListener('change', () => { if (motionQuery.matches) stopEffects(); renderSettings(); });
renderSettings(); render();
Object.defineProperty(window, '__BLACKOUT_BROADCAST__', { value: Object.freeze({
  snapshot: () => structuredClone({ state, plan, historyLength: history.length, sound, paused }),
}) });
