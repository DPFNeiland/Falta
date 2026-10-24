// Cada tempo de aula faltado = 2 faltas
const FALTAS_POR_TEMPO = 2;

// Máximo de tempos por período, pelas restrições originais (1 tempo = 1 unidade do modelo)
// sel: matérias marcadas no período. dob: quais dessas matérias são dobradinha naquele dia.
const PERIODOS = [
  {dia:'Segunda', turno:'Manhã', ub:3, sel:[], dob:[]},
  {dia:'Segunda', turno:'Tarde', ub:2, sel:[], dob:[]},
  {dia:'Terça',   turno:'Manhã', ub:3, sel:[], dob:[]},
  {dia:'Quarta',  turno:'Manhã', ub:3, sel:[], dob:[]},
  {dia:'Quarta',  turno:'Tarde', ub:2, sel:[], dob:[]},
  {dia:'Quinta',  turno:'Manhã', ub:3, sel:[], dob:[]},
  {dia:'Quinta',  turno:'Tarde', ub:1, sel:[], dob:[]},
  {dia:'Sexta',   turno:'Manhã', ub:3, sel:[], dob:[]},
  {dia:'Sexta',   turno:'Tarde', ub:1, sel:[], dob:[]},
];
const DIAS = ['Segunda','Terça','Quarta','Quinta','Sexta'];

const TEMPLATE_11_MATERIAS = [
  {nome:'Machine Learning', lim:'18', usadas:''},
  {nome:'Modelagem em construção de software', lim:'18', usadas:''},
  {nome:'Análise e Solução de Software', lim:'8', usadas:''},
  {nome:'Análise Preditiva', lim:'17', usadas:''},
  {nome:'Estatística Multivariada', lim:'19', usadas:''},
  {nome:'Qualidade de Software', lim:'19', usadas:''},
  {nome:'Marketing Estratégico', lim:'20', usadas:''},
  {nome:'Pesquisa Operacional e Cálculo Aplicado', lim:'19', usadas:''},
  {nome:'Pensamento Experimental e Visão de Futuros', lim:'10', usadas:''},
  {nome:'Programação Backend', lim:'19', usadas:''},
  {nome:'Projeto Integrado IV', lim:'9', usadas:''},
];
const INDICE = Object.fromEntries(TEMPLATE_11_MATERIAS.map((m, i) => [m.nome, i]));
const GRADE_BASE = PERIODOS.map(p => ({...p, sel:[], dob:[]}));
const TEMPLATE_11_PERIODOS = GRADE_BASE.map((p, i) => ({...p,
  sel: [
    ['Machine Learning', 'Modelagem em construção de software', 'Análise e Solução de Software'],
    ['Análise Preditiva'],
    ['Estatística Multivariada', 'Qualidade de Software', 'Marketing Estratégico'],
    ['Pesquisa Operacional e Cálculo Aplicado', 'Pensamento Experimental e Visão de Futuros', 'Marketing Estratégico'],
    [],
    ['Estatística Multivariada', 'Programação Backend'],
    ['Pesquisa Operacional e Cálculo Aplicado'],
    ['Projeto Integrado IV', 'Machine Learning', 'Modelagem em construção de software'],
    ['Qualidade de Software'],
  ][i].map(nome => INDICE[nome]),
  dob: [
    [], ['Análise Preditiva'], [], [], [], ['Programação Backend'], [], [], []
  ][i].map(nome => INDICE[nome]).filter(k => k !== undefined),
}));

const TEMPLATE_TI2A_MATERIAS = [
  {nome:'Projeto Integrado', lim:'8', usadas:''},
  {nome:'Laboratório de Programação', lim:'18', usadas:''},
  {nome:'Fundamentos de Marketing', lim:'19', usadas:''},
  {nome:'Programação Web', lim:'19', usadas:''},
  {nome:'Estatística', lim:'19', usadas:''},
  {nome:'Engenharia de Software', lim:'19', usadas:''},
  {nome:'Storytelling', lim:'10', usadas:''},
  {nome:'Banco de dados', lim:'19', usadas:''},
  {nome:'UX/UI', lim:'20', usadas:''},
  {nome:'Colaboração e influência social', lim:'9', usadas:''},
];
const INDICE_TI2A = Object.fromEntries(TEMPLATE_TI2A_MATERIAS.map((m, i) => [m.nome, i]));
const TEMPLATE_TI2A_PERIODOS = GRADE_BASE.map((p, i) => ({...p,
  sel: [
    ['Projeto Integrado', 'Laboratório de Programação', 'Fundamentos de Marketing'], [],
    ['Programação Web', 'Estatística', 'Engenharia de Software'],
    ['Storytelling', 'Banco de dados', 'Fundamentos de Marketing'], ['UX/UI'],
    ['Programação Web', 'Estatística', 'Banco de dados'],
    [], ['Laboratório de Programação', 'Engenharia de Software', 'Colaboração e influência social'], [],
  ][i].map(nome => INDICE_TI2A[nome]).filter(k => k !== undefined),
  dob: [[], [], [], [], ['UX/UI'], [], [], [], []][i]
    .map(nome => INDICE_TI2A[nome]).filter(k => k !== undefined),
}));

const MATERIAS = [];

function aplicarTemplate(nome){
  const materias = nome === 'ti2a' ? TEMPLATE_TI2A_MATERIAS.map(m => ({...m}))
    : nome === 'vazio' ? []
    : TEMPLATE_11_MATERIAS.map(m => ({...m}));
  const origem = nome === 'ti2a' ? TEMPLATE_TI2A_PERIODOS
    : nome === 'vazio' ? GRADE_BASE : TEMPLATE_11_PERIODOS;
  const periodos = origem.map(p => ({...p, sel:p.sel.slice(), dob:p.dob.slice()}));
  MATERIAS.splice(0, MATERIAS.length, ...materias);
  PERIODOS.splice(0, PERIODOS.length, ...periodos);
  renderMaterias();
  renderGrade();
  calcular();
}

/* ---------- Utilitários ---------- */

function esc(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function fmtFaltas(tempos){
  return `${tempos * FALTAS_POR_TEMPO} falta(s)`;
}
function rotulo(k){
  return MATERIAS[k].nome.trim() || `Matéria ${k+1}`;
}
// Tempos ocupados por 1 unidade de falta da matéria k no período i: 2 se dobradinha naquele dia, senão 1
function peso(i, k){
  return PERIODOS[i].dob.includes(k) ? 2 : 1;
}
function parseNum(s){
  const t = String(s).trim().replace(',', '.');
  if (t === '') return null;
  const v = parseFloat(t);
  return (isNaN(v) || v < 0) ? null : v;
}
function usadoFaltas(k){
  return parseNum(MATERIAS[k].usadas) ?? 0;
}
// Capacidade restante da matéria em tempos (Infinity = sem limite)
function capacidadeTempos(k){
  const lim = parseNum(MATERIAS[k].lim);
  if (lim === null) return Infinity;
  return Math.max(0, Math.floor((lim - usadoFaltas(k)) / FALTAS_POR_TEMPO));
}

/* ---------- Renderização ---------- */

function renderMaterias(){
  document.getElementById('materias').innerHTML = MATERIAS.map((m, k) =>
    `<tr><td>${k+1}</td>
     <td><input data-k="${k}" data-f="nome" value="${esc(m.nome)}" placeholder="ex.: Algoritmos"></td>
     <td><input class="num" inputmode="decimal" data-k="${k}" data-f="usadas" value="${esc(m.usadas)}" placeholder="0"></td>
     <td><input class="num" inputmode="decimal" data-k="${k}" data-f="lim" value="${esc(m.lim)}" placeholder="sem limite"></td></tr>`
  ).join('');
}

function renderGrade(){
  document.getElementById('grade').innerHTML = PERIODOS.map((p, i) => {
    const chips = MATERIAS.map((_, k) => {
      const marcada = p.sel.includes(k);
      const dobra = marcada
        ? `<label class="dob"><input type="checkbox" data-i="${i}" data-k="${k}" data-d="1" ${p.dob.includes(k) ? 'checked' : ''}>dobradinha neste dia</label>`
        : '';
      return `<div class="chk">
        <label><input type="checkbox" data-i="${i}" data-k="${k}" ${marcada ? 'checked' : ''}>${esc(rotulo(k))}</label>
        ${dobra}
      </div>`;
    }).join('');
    return `<tr><td>${p.dia}</td><td>${p.turno}</td><td><div class="checks">${chips}</div></td></tr>`;
  }).join('');
}

/* ---------- Cálculo ---------- */

function calcular(){
  const capTempos = MATERIAS.map((_, k) => capacidadeTempos(k));
  const usoPeriodos = PERIODOS.map(() => 0);
  const uso = capTempos.slice();
  let melhor = usoPeriodos.slice();
  let melhorTotal = 0;

  // Cada decisão representa faltar uma ocorrência inteira daquele período.
  // Ex.: uma sexta de manhã consome 1 falta de tempo de cada matéria do período;
  // uma dobradinha consome 2 tempos da matéria correspondente.
  function buscar(i, total){
    if (i === PERIODOS.length){
      if (total > melhorTotal){
        melhorTotal = total;
        melhor = usoPeriodos.slice();
      }
      return;
    }
    const p = PERIODOS[i];
    let max = Infinity;
    for (const k of p.sel){
      const w = peso(i, k);
      max = Math.min(max, Math.floor(uso[k] / w));
    }
    if (!p.sel.length) max = 0;
    if (!Number.isFinite(max)) max = 100;
    for (let n = max; n >= 0; n--){
      usoPeriodos[i] = n;
      for (const k of p.sel) uso[k] -= n * peso(i, k);
      buscar(i + 1, total + n);
      for (const k of p.sel) uso[k] += n * peso(i, k);
    }
    usoPeriodos[i] = 0;
  }
  buscar(0, 0);

  const escolhidos = melhor;
  const xPer = PERIODOS.map((p, i) => escolhidos[i] * p.ub);
  const usoMat = MATERIAS.map(() => 0);
  const detalhe = PERIODOS.map(() => []);
  PERIODOS.forEach((p, i) => {
    p.sel.forEach(k => {
      const tempos = escolhidos[i] * peso(i, k);
      usoMat[k] += tempos;
      detalhe[i].push({k, v: tempos, dob: p.dob.includes(k)});
    });
  });

  const totalTempos = xPer.reduce((a, b) => a + b, 0);
  document.getElementById('total').textContent = fmtFaltas(totalTempos);
  document.getElementById('totalTempo').textContent = `${melhorTotal} período(s) completo(s)`;

  document.getElementById('porDia').innerHTML = PERIODOS.map((p, i) => ({p, i}))
    .filter(({p}) => p.sel.length > 0)
    .map(({p, i}) => {
    const cls = escolhidos[i] > 0 ? 'ok' : 'warn';
    const txt = escolhidos[i] > 0 ? `${escolhidos[i]} vez(es) — ${fmtFaltas(xPer[i])}` : 'não pode faltar';
    return `<tr><td>${p.dia} ${p.turno.toLowerCase()}</td><td class="${cls}">${txt}</td></tr>`;
  }).join('');

  document.getElementById('porPeriodo').innerHTML = PERIODOS.map((p, i) => ({p, i}))
    .filter(({p}) => p.sel.length > 0)
    .map(({p, i}) => {
    const materias = detalhe[i].length
      ? detalhe[i].map(d => `${esc(rotulo(d.k))}${d.dob ? ' <span class="muted">(dobradinha)</span>' : ''}: ${fmtFaltas(d.v)}`).join('<br>')
      : '<span class="muted">sem matéria marcada</span>';
    const vezes = escolhidos[i];
    return `<tr><td>${p.dia} ${p.turno.toLowerCase()}</td><td>${vezes ? `${vezes} vez(es): ${materias}` : '<span class="muted">não selecionado</span>'}</td><td>${fmtFaltas(xPer[i])}</td></tr>`;
  }).join('');

  const usadas = MATERIAS.map((_, k) => k).filter(k => PERIODOS.some(p => p.sel.includes(k)));
  document.getElementById('usoMat').innerHTML = usadas.length ? usadas.map(k => {
    const lim = parseNum(MATERIAS[k].lim) === null ? 'sem limite' : `${esc(MATERIAS[k].lim.trim())} falta(s)`;
    const ainda = capTempos[k] === Infinity ? 'sem limite' : `${capTempos[k] * FALTAS_POR_TEMPO} falta(s)`;
    const ja = usadoFaltas(k) > 0 ? `${usadoFaltas(k)} falta(s)` : '0';
    return `<tr><td>${esc(rotulo(k))}</td><td>${ja}</td><td>${lim}</td><td>${ainda}</td><td>${fmtFaltas(usoMat[k])}</td></tr>`;
  }).join('') : '<tr><td colspan="5" class="muted">Nenhuma matéria marcada na grade.</td></tr>';
}

/* ---------- Eventos ---------- */

document.getElementById('template').addEventListener('change', e => {
  aplicarTemplate(e.target.value);
});

function atualizarMateria(e){
  if (!e.target.dataset.k || !e.target.dataset.f) return;
  const k = +e.target.dataset.k;
  MATERIAS[k][e.target.dataset.f] = e.target.value;
  if (e.target.dataset.f === 'nome') renderGrade();
  calcular();
}

// Recalcula imediatamente enquanto o usuário digita e também ao confirmar o campo.
['input', 'keyup', 'change'].forEach(evento => {
  document.getElementById('materias').addEventListener(evento, atualizarMateria);
});

document.getElementById('grade').addEventListener('change', e => {
  const i = +e.target.dataset.i;
  const k = +e.target.dataset.k;
  const P = PERIODOS[i];
  if (e.target.dataset.d) {
    // dobradinha neste dia
    const pos = P.dob.indexOf(k);
    if (e.target.checked && pos < 0) P.dob.push(k);
    if (!e.target.checked && pos >= 0) P.dob.splice(pos, 1);
  } else {
    // matéria marcada ou desmarcada no período
    if (e.target.checked){
      if (!P.sel.includes(k)) P.sel.push(k);
    } else {
      const pos = P.sel.indexOf(k);
      if (pos >= 0) P.sel.splice(pos, 1);
      const pd = P.dob.indexOf(k);
      if (pd >= 0) P.dob.splice(pd, 1);
    }
  }
  renderGrade();
  calcular();
});

document.getElementById('addMat').addEventListener('click', () => {
  MATERIAS.push({nome:'', lim:'', usadas:''});
  renderMaterias();
  renderGrade();
  calcular();
});

/* ---------- Início ---------- */

aplicarTemplate('grade-base');
