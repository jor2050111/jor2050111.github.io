import { cables, encounter } from './levels.js';
import { assignCable, evaluate, formatSeconds } from './rules.js';

const $ = selector => document.querySelector(selector);
const storageKey = 'campus-festival-ch02-settings-v1';
const state = { assignments: { mural: null, stage: null }, selected: null, history: [], results: null, testing: false, hint: 0, sound: false, lessMotion: matchMedia('(prefers-reduced-motion: reduce)').matches };
let previewToken = 0;
let audio;

try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && typeof saved.sound === 'boolean') state.sound = saved.sound;
  if (saved && typeof saved.lessMotion === 'boolean') state.lessMotion ||= saved.lessMotion;
} catch { /* The puzzle also works with browser storage unavailable. */ }

const connector = '<svg aria-hidden="true" viewBox="0 0 28 18"><rect x="2" y="3" width="24" height="12" rx="6"/><path d="M8 9h12"/></svg>';
const cableDrawing = '<svg class="cable-diagram" aria-hidden="true" viewBox="0 0 240 55"><path d="M38 27h22c25 0 12 20 39 20s22-36 49-36 20 16 36 16h18"/><rect x="12" y="20" width="28" height="14" rx="6"/><path d="M19 27h14"/><rect x="201" y="20" width="28" height="14" rx="6"/><path d="M208 27h14"/></svg>';

$('#stations').innerHTML = encounter.stations.map(station => `
  <article class="station" id="station-${station.id}" aria-labelledby="name-${station.id}">
    <div class="station-header"><span class="station-number">${station.number}</span><h3 id="name-${station.id}">${station.title}</h3><span class="file-size">${station.sizeGB} GB</span></div>
    <div class="station-specs"><span>USB-C · Host + drive: 10 Gbps</span><span>Target: ≤ ${station.targetSeconds} s</span></div>
    <button class="connect-button" id="connect-${station.id}" aria-label="Connect a cable to ${station.title}">${connector}<span>Choose a cable first</span></button>
    <div class="station-progress" aria-hidden="true"><span></span></div>
    <p class="station-result" id="result-${station.id}"></p>
  </article>`).join('');

$('#cables').innerHTML = cables.map(cable => `
  <button class="cable" id="cable-${cable.id}" aria-pressed="false" aria-label="Select ${cable.name}, ${cable.label}. ${cable.description}">
    <span class="cable-top"><span>${cable.name}</span><span class="cable-speed">${cable.label}</span></span>
    ${cableDrawing}<span class="cable-bottom"><span>USB-C ↔ USB-C</span><span class="cable-location">Available</span></span>
  </button>`).join('');

function announce(message) { $('#announcer').textContent = message; }
function feedback(message) { $('#feedback-copy').textContent = message; announce(message); }
function saveSettings() {
  try { localStorage.setItem(storageKey, JSON.stringify({ sound: state.sound, lessMotion: state.lessMotion })); } catch { /* Optional preferences only. */ }
}
function renderSettings() {
  $('#sound').setAttribute('aria-pressed', String(state.sound));
  $('#sound span').textContent = state.sound ? 'Sound on' : 'Sound off';
  $('#sound').setAttribute('aria-label', state.sound ? 'Turn sound off' : 'Turn sound on');
  $('#motion').setAttribute('aria-pressed', String(state.lessMotion));
  $('#motion').setAttribute('aria-label', state.lessMotion ? 'Less motion on' : 'Less motion off');
  document.body.classList.toggle('less-motion', state.lessMotion);
}
function chime(success = false) {
  if (!state.sound) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    audio.resume().catch(() => {});
    const tones = success ? [261.63, 329.63, 392, 523.25] : [440];
    tones.forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = audio.currentTime + index * 0.11;
      oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.055, start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
      oscillator.connect(gain); gain.connect(audio.destination);
      oscillator.start(start); oscillator.stop(start + 0.45);
    });
  } catch { /* Sound must not block play. */ }
}

function render() {
  document.body.classList.toggle('has-selection', Boolean(state.selected));
  for (const cable of cables) {
    const button = $(`#cable-${cable.id}`);
    const assigned = encounter.stations.find(station => state.assignments[station.id] === cable.id);
    button.setAttribute('aria-pressed', String(state.selected === cable.id));
    button.querySelector('.cable-location').textContent = assigned ? assigned.title : 'Available';
    button.disabled = state.testing;
  }
  let ready = 0;
  for (const station of encounter.stations) {
    const button = $(`#connect-${station.id}`);
    const cable = cables.find(item => item.id === state.assignments[station.id]);
    const result = state.results?.outcomes[station.id];
    const success = Boolean(result?.meetsTarget);
    const selected = cables.find(item => item.id === state.selected);
    button.querySelector('span').textContent = selected ? `Connect ${selected.name} here` : cable ? `${cable.name} · ${cable.label}` : 'Choose a cable first';
    button.setAttribute('aria-label', selected ? `Connect ${selected.name} to ${station.title}` : cable ? `${station.title}: ${cable.name}, ${cable.label}. Select another cable to change.` : `Connect a cable to ${station.title}`);
    button.classList.toggle('assigned', Boolean(cable));
    button.disabled = state.testing;
    $(`#station-${station.id}`).classList.toggle('ready', success);
    $(`#station-${station.id}`).classList.toggle('slow', Boolean(result && !success));
    $(`#${station.id}-tag`).classList.toggle('ready', success);
    $(`#${station.id}-tag small`).textContent = success ? 'Media ready' : state.testing ? 'Testing connection…' : 'Waiting for media';
    $('.festival').classList.toggle(`${station.id}-ready`, success);
    if (success) ready++;
    const resultElement = $(`#result-${station.id}`);
    if (result?.kind === 'connected') {
      resultElement.textContent = `${formatSeconds(result.seconds)} s ideal · ${success ? 'Target met' : 'Over the target'}. Limited by the ${result.bottlenecks.join(' + ') || 'shared transfer mode'}.`;
    } else resultElement.textContent = '';
    if (!state.testing) {
      const bar = $(`#station-${station.id} .station-progress span`);
      bar.style.transition = 'none';
      bar.style.width = result ? `${Math.min(100, station.targetSeconds / result.seconds * 100)}%` : '0%';
    }
  }
  $('#scene-count').textContent = `${ready} / 2 ready`;
  $('.festival').classList.toggle('complete', ready === 2);
  $('#test').setAttribute('aria-disabled', String(state.testing || !Object.values(state.assignments).every(Boolean)));
  $('#test').innerHTML = state.testing ? 'Previewing transfers…' : 'Test connections <span aria-hidden="true">↗</span>';
  $('#undo').disabled = state.testing || !state.history.length;
  $('#reset').disabled = state.testing;
  $('#hint').disabled = state.testing;
  $('#selection-copy').textContent = state.selected ? `${cables.find(cable => cable.id === state.selected).name} selected. Choose an installation.` : 'Select a cable. Then choose an installation.';
  $('#finish').hidden = ready !== 2;
  $('#scene-caption').textContent = ready === 2 ? 'The mural moves. The stage glows. You made the night.' : ready ? 'One installation is ready. The other needs a different connection.' : 'The courtyard is ready. Your connections bring the visuals.';
}

function clearResult() {
  state.results = null;
  $('#finish').hidden = true;
}

for (const cable of cables) $(`#cable-${cable.id}`).addEventListener('click', () => {
  if (state.testing) return;
  state.selected = state.selected === cable.id ? null : cable.id;
  render();
  feedback(state.selected ? `${cable.name} selected: ${cable.label}. Choose the mural or stage.` : 'Cable deselected. Choose either cable when you’re ready.');
  chime();
});

for (const station of encounter.stations) $(`#connect-${station.id}`).addEventListener('click', () => {
  if (state.testing) return;
  if (!state.selected) {
    feedback('Choose a cable from your kit first. Then select its installation.');
    $('#cable-a').focus();
    return;
  }
  const before = { ...state.assignments };
  const next = assignCable(before, station.id, state.selected);
  const moved = encounter.stations.find(item => item.id !== station.id && before[item.id] === state.selected);
  if (JSON.stringify(before) !== JSON.stringify(next)) {
    state.history.push(before);
    state.assignments = next;
    clearResult();
  }
  const name = cables.find(cable => cable.id === state.selected).name;
  state.selected = null;
  render();
  feedback(moved && before[station.id] ? `Cables swapped. ${name} is now at the ${station.title.toLowerCase()}.` : `${name} connected to the ${station.title.toLowerCase()}. ${Object.values(next).every(Boolean) ? 'Ready to test your connections.' : 'Connect the other installation next.'}`);
  chime();
});

$('#test').addEventListener('click', () => {
  if (state.testing) return;
  if (!Object.values(state.assignments).every(Boolean)) {
    feedback('Connect one cable to each installation, then test your plan.');
    return;
  }
  const result = evaluate(encounter.stations, cables, state.assignments);
  state.testing = true; state.selected = null; state.results = null;
  const token = ++previewToken;
  render();
  feedback('Previewing each transfer against its target. This is a short preview, not a live countdown.');
  const duration = state.lessMotion || matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1600;
  for (const station of encounter.stations) {
    const bar = $(`#station-${station.id} .station-progress span`);
    bar.style.transition = 'none'; bar.style.width = '0%';
    // A paint boundary lets a repeated test start from an empty track.
    void bar.offsetWidth;
    bar.style.transition = `width ${duration}ms ease-out`;
    bar.style.width = `${Math.min(100, station.targetSeconds / result.outcomes[station.id].seconds * 100)}%`;
  }
  setTimeout(() => {
    if (token !== previewToken) return;
    state.testing = false; state.results = result;
    render();
    if (result.complete) {
      feedback('Both targets met. Mural: 3.2 seconds. Stage: 8.3 seconds. The fast cable handled the larger file.');
      chime(true);
    } else {
      feedback('The stage is ready in 0.8 seconds, but the mural needs 33.3 seconds. Which connection would help the larger file?');
    }
  }, duration);
});

$('#undo').addEventListener('click', () => {
  if (!state.history.length || state.testing) return;
  state.assignments = state.history.pop(); state.selected = null; clearResult(); render(); feedback('Last connection undone. Your earlier arrangement is back.');
});
$('#reset').addEventListener('click', () => {
  if (state.testing) return;
  state.assignments = { mural: null, stage: null }; state.selected = null; state.history = []; state.hint = 0; clearResult(); render(); feedback('A fresh start. Pick a cable, then choose an installation.');
});
const hints = [
  'Both cables have USB-C ends. Their supported speeds differ. Which file is larger?',
  'The mural has 2 GB to transfer in 4 seconds. The stage has 0.5 GB and a 10-second target. Where does the faster cable help most?',
  'Try Cable A at the mural and Cable B at the stage. Select an assigned cable to move it. The other cable swaps automatically.',
];
$('#hint').addEventListener('click', () => { feedback(hints[Math.min(state.hint++, hints.length - 1)]); });
$('#experiment').addEventListener('click', () => { $('#cable-a').focus(); feedback('Try swapping the cables and compare the results. You can always undo.'); });
$('#sound').addEventListener('click', () => { state.sound = !state.sound; renderSettings(); saveSettings(); chime(); });
$('#motion').addEventListener('click', () => { state.lessMotion = !state.lessMotion; renderSettings(); saveSettings(); });
$('#help').addEventListener('click', () => $('#help-dialog').showModal());
$('#close-help').addEventListener('click', () => $('#help-dialog').close());
$('#help-done').addEventListener('click', () => $('#help-dialog').close());
renderSettings(); render();

// Read-only inspection supports repeatable QA without bypassing real controls.
Object.defineProperty(window, '__CAMPUS_FESTIVAL__', { value: Object.freeze({ snapshot: () => structuredClone({ encounter: encounter.id, ...state, history: undefined }) }) });
