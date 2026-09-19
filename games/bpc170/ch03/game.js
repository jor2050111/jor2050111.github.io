import { initialBuild, workloads, goals, coolers, speeds } from './levels.js';
import { evaluate } from './rules.js';

const $ = selector => document.querySelector(selector);
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const state = { build: initialBuild(), history: [], experiments: [], discoveries: [],
  tests: 0, hint: 0, sound: false, paused: motionQuery.matches };
let audio;
let soundNodes = [];
let effectTimer;
const directionName = { in: 'intake', out: 'exhaust', off: 'off' };

function announce(message) { $('#announcer').textContent = message; }
function feedback(title, message) {
  $('#feedback-title').textContent = title;
  $('#feedback-copy').textContent = message;
  announce(`${title} ${message}`);
}
function stopEffects() {
  clearTimeout(effectTimer);
  $('#scene').classList.remove('testing');
  $('#win-dialog').classList.remove('celebrate');
  for (const node of soundNodes) { try { node.stop(); } catch { /* Already ended. */ } }
  soundNodes = [];
}
function chime(success = false) {
  if (!state.sound) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    audio.resume().catch(() => {});
    const notes = success ? [392, 493.88, 587.33, 783.99] : [392, 523.25];
    notes.forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = audio.currentTime + index * .13;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(.035, start + .02);
      gain.gain.exponentialRampToValueAtTime(.001, start + .3);
      oscillator.connect(gain); gain.connect(audio.destination);
      oscillator.start(start); oscillator.stop(start + .35);
      soundNodes.push(oscillator);
      oscillator.onended = () => {
        oscillator.disconnect(); gain.disconnect();
        soundNodes = soundNodes.filter(item => item !== oscillator);
      };
    });
  } catch { /* Optional audio must not prevent the experiment. */ }
}

function renderSettings() {
  document.body.classList.toggle('less-motion', state.paused || motionQuery.matches);
  $('#motion').setAttribute('aria-pressed', String(state.paused || motionQuery.matches));
  $('#motion').textContent = state.paused || motionQuery.matches ? 'Motion paused' : 'Pause motion';
  $('#sound').setAttribute('aria-pressed', String(state.sound));
  $('#sound').textContent = state.sound ? 'Sound on' : 'Sound off';
}
function renderScene(result) {
  const build = state.build;
  $('#scene').classList.toggle('full-pace', result.full);
  $('#cable-bundle').toggleAttribute('hidden', build.tidy);
  $('#cable-tidy').toggleAttribute('hidden', !build.tidy);
  $('#compact-cooler').toggleAttribute('hidden', build.cooler !== 'compact');
  $('#tower-cooler').toggleAttribute('hidden', build.cooler !== 'tower');
  for (const fan of ['front', 'rear', 'top']) {
    const direction = build[fan];
    $(`#${fan}-fan`).classList.toggle('off', direction === 'off');
    const path = $(`#flow-${fan}`);
    path.toggleAttribute('hidden', direction === 'off');
    const reversed = fan === 'front' ? direction === 'out' : direction === 'in';
    const color = direction === 'in' ? 'cool' : 'warm';
    path.setAttribute('stroke', direction === 'in' ? '#267b84' : '#b75d35');
    path.removeAttribute('marker-start'); path.removeAttribute('marker-end');
    path.setAttribute(reversed ? 'marker-start' : 'marker-end', `url(#arrow-${color})`);
    path.classList.toggle('reverse', reversed);
  }
  // A central schematic connects active fans, without pretending to solve CFD.
  const starts = { front: 'M258 266', rear: 'M477 195', top: 'M416 152' };
  const ends = { front: '258 266', rear: '477 195', top: '416 152' };
  const intakeFan = ['front', 'rear', 'top'].find(fan => build[fan] === 'in');
  const exhaustFan = ['rear', 'top', 'front'].find(fan => build[fan] === 'out');
  $('#flow-core').toggleAttribute('hidden', !intakeFan || !exhaustFan);
  if (intakeFan && exhaustFan) {
    $('#flow-core').setAttribute('d', `${starts[intakeFan]} Q367 160 ${ends[exhaustFan]}`);
  }
  $('#flow-core').style.opacity = build.tidy ? '.7' : '.25';
  const duration = { quiet: '4s', balanced: '2.5s', boost: '1.3s' }[build.speed];
  document.querySelectorAll('#front-fan .rotor, #rear-fan .rotor, #top-fan .rotor').forEach(node => { node.style.animationDuration = duration; });
  $('#scene-state').textContent = build.tidy ? 'AIR PATH CLEAR' : 'AIR PATH CROWDED';
  $('#scene-caption').textContent = `${result.intake} intake · ${result.exhaust} exhaust · ${3 - result.active} off. Blue comes in. Amber goes out.`;
  $('#machine-description').textContent = `Cutaway computer. Front fan ${directionName[build.front]}, rear fan ${directionName[build.rear]}, top fan ${directionName[build.top]}. ${build.tidy ? 'Clear' : 'Crowded'} cable path. ${coolers[build.cooler].name}. ${result.thermal}, ${result.full ? 'full' : 'reduced'} pace, ${result.noise.toLowerCase()} noise.`;
}
function renderGoals() {
  for (const goal of goals) {
    const element = $(`#goal-${goal.id}`);
    const found = state.discoveries.includes(goal.id);
    element.classList.toggle('found', found);
    element.querySelector('.goal-icon').textContent = found ? '✓' : String(goals.indexOf(goal) + 1).padStart(2, '0');
    element.querySelector('.goal-status').textContent = found ? 'Discovered' : 'Try this build';
  }
  $('#discovery-count').textContent = `${state.discoveries.length} / 3 discovered`;
}
function describe(build) {
  return `Front ${directionName[build.front]} · rear ${directionName[build.rear]} · top ${directionName[build.top]}. ${speeds[build.speed].name} fans, ${coolers[build.cooler].name.toLowerCase()}, ${build.tidy ? 'clear' : 'crowded'} path.`;
}
function renderNotebook() {
  $('#empty-notebook').hidden = Boolean(state.experiments.length);
  $('#experiments').replaceChildren();
  for (const experiment of state.experiments) {
    const item = document.createElement('li');
    item.className = 'experiment';
    const header = document.createElement('div'); header.className = 'experiment-heading';
    const title = document.createElement('h3'); title.textContent = `#${experiment.id} · ${workloads[experiment.build.workload].name}`;
    const restore = document.createElement('button'); restore.textContent = 'Restore';
    restore.setAttribute('aria-label', `Restore experiment ${experiment.id}`);
    restore.addEventListener('click', () => {
      state.history.push(structuredClone(state.build));
      state.build = structuredClone(experiment.build);
      render();
      feedback(`Experiment ${experiment.id} restored.`, 'Its settings are back on the workbench. Change one thing and test again.');
      $('#test').focus();
    });
    header.append(title, restore);
    const settings = document.createElement('p'); settings.textContent = describe(experiment.build);
    const result = document.createElement('p'); result.className = 'result-line';
    result.textContent = `${experiment.result.full ? 'Full' : 'Reduced'} pace · ${experiment.result.noise} noise · Cooling ${experiment.result.capacity} / demand ${experiment.result.demand}`;
    item.append(header, settings, result); $('#experiments').append(item);
  }
}
function render() {
  const result = evaluate(state.build);
  document.querySelectorAll('button[data-key]').forEach(button => {
    button.setAttribute('aria-pressed', String(state.build[button.dataset.key] === button.dataset.value));
  });
  $('#tidy').setAttribute('aria-pressed', String(state.build.tidy));
  $('#tidy-title').textContent = state.build.tidy ? 'Cable path cleared' : 'Clear the cable path';
  $('#tidy-note').textContent = state.build.tidy ? 'Cables sit out of the way. Toggle to compare.' : 'A loose bundle crowds the path through the case.';
  $('#workload-description').textContent = workloads[state.build.workload].detail;
  $('#thermal').textContent = result.thermal;
  $('#thermal').classList.toggle('limited', !result.full);
  $('#capacity-caption').textContent = result.full ? 'Cooling meets demand' : 'Cooling below demand';
  $('#pace').textContent = result.full ? 'Full pace' : 'Reduced';
  $('#pace-caption').textContent = result.full ? 'Ready for this workload' : 'Cooling needs a little help';
  $('#noise').textContent = result.noise;
  $('#mobile-pace').textContent = `${result.full ? 'Full' : 'Reduced'} pace · ${result.noise.toLowerCase()} noise`;
  $('#mobile-balance').textContent = `Cooling ${result.capacity} / demand ${result.demand}`;
  $('#capacity').textContent = result.capacity; $('#demand').textContent = result.demand;
  $('#capacity-bar').style.width = `${Math.min(result.capacity, 100)}%`;
  $('#demand-mark').style.left = `${result.demand}%`;
  $('#undo').disabled = !state.history.length;
  renderScene(result); renderGoals();
  return result;
}
function change(key, value) {
  if (state.build[key] === value) return;
  stopEffects();
  state.history.push(structuredClone(state.build));
  state.build[key] = value;
  state.hint = 0;
  const result = render();
  feedback(`${result.thermal}. ${result.noise} fan noise.`, result.advice);
}

$('#goals').innerHTML = goals.map((goal, index) => `<article class="goal" id="goal-${goal.id}"><span class="goal-icon" aria-hidden="true">${index + 1}</span><div><h3>${goal.name}</h3><p>${goal.description}</p><span class="goal-status">Try this build</span></div></article>`).join('');
document.querySelectorAll('button[data-key]').forEach(button => {
  button.addEventListener('click', () => change(button.dataset.key, button.dataset.value));
});
$('#tidy').addEventListener('click', () => change('tidy', !state.build.tidy));
$('#test').addEventListener('click', () => {
  stopEffects();
  const result = evaluate(state.build);
  state.experiments.unshift({ id: ++state.tests, build: structuredClone(state.build), result });
  state.experiments = state.experiments.slice(0, 6);
  const newBadge = result.badge && !state.discoveries.includes(result.badge);
  if (newBadge) state.discoveries.push(result.badge);
  renderGoals(); renderNotebook();
  if (newBadge) {
    feedback(`${workloads[result.badge].badge} discovered.`, `${result.full ? 'Full pace' : 'Reduced pace'}, ${result.noise.toLowerCase()} fan noise. Your build is in the notebook. ${state.discoveries.length < 3 ? 'Try another workload to explore a different design.' : 'All three discoveries are yours. Keep experimenting whenever you like.'}`);
  } else {
    feedback(`Experiment ${state.tests} saved. ${result.full ? 'Full pace' : 'Reduced pace'}.`, result.advice);
  }
  if (newBadge && state.discoveries.length === 3) {
    $('#win-dialog').showModal();
    $('#win-dialog').classList.add('celebrate');
    chime(true);
  } else {
    $('#scene').classList.add('testing');
    chime(Boolean(newBadge));
  }
  effectTimer = setTimeout(stopEffects, 1400);
});
$('#undo').addEventListener('click', () => {
  if (!state.history.length) return;
  stopEffects(); state.build = state.history.pop(); state.hint = 0;
  const result = render();
  feedback('Last workbench change undone.', result.advice);
});
$('#reset').addEventListener('click', () => {
  stopEffects();
  if ($('#win-dialog').open) $('#win-dialog').close();
  state.build = initialBuild(); state.history = []; state.experiments = [];
  state.discoveries = []; state.tests = 0; state.hint = 0;
  render(); renderNotebook();
  feedback('A fresh workbench.', 'Your notebook and discoveries are cleared. Start by clearing the cable path, then test your build.');
});
$('#hint').addEventListener('click', () => {
  const result = evaluate(state.build);
  const hints = [result.advice,
    'Try a clear cable path with the front fan drawing in and the rear fan blowing out. Keep the top off at first, then compare.',
    state.build.workload === 'render'
      ? 'For this heavy workload, try a tower cooler, a clear path, front intake, rear and top exhaust, and Boost fans. Then explore other working designs.'
      : state.build.workload === 'studio'
        ? 'For the photo studio, try a clear path, front intake, rear exhaust, top off, and Balanced fans. The compact cooler can handle this model workload.'
        : 'For the quiet desk, try a clear path, Quiet fans, front intake, rear exhaust, top off, and the compact cooler. Test to record it.',
  ];
  feedback('A little nudge.', hints[Math.min(state.hint++, hints.length - 1)]);
});
$('#sound').addEventListener('click', () => { state.sound = !state.sound; if (!state.sound) stopEffects(); renderSettings(); if (state.sound) chime(); });
$('#motion').addEventListener('click', () => {
  state.paused = !state.paused;
  renderSettings();
  if (state.paused || motionQuery.matches) stopEffects();
  announce(motionQuery.matches ? 'Your device requests reduced motion. All effects remain paused.' : state.paused ? 'Motion paused.' : 'Motion resumed.');
});
motionQuery.addEventListener('change', () => { renderSettings(); if (motionQuery.matches) stopEffects(); });
$('#help').addEventListener('click', () => $('#help-dialog').showModal());
for (const id of ['close-help', 'help-done']) $(`#${id}`).addEventListener('click', () => $('#help-dialog').close());
for (const id of ['close-win', 'win-done']) $(`#${id}`).addEventListener('click', () => $('#win-dialog').close());
$('#win-dialog').addEventListener('close', () => { stopEffects(); $('#test').focus(); });
$('#help-dialog').addEventListener('close', () => $('#help').focus());
renderSettings(); render(); renderNotebook();

// Inspection returns copies and cannot bypass the real controls.
Object.defineProperty(window, '__BREEZE_LAB__', { value: Object.freeze({
  snapshot: () => structuredClone({ ...state, result: evaluate(state.build) }),
}) });
