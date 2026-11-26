// Cada tempo de aula faltado = 2 faltas
const FALTAS_POR_TEMPO = 2;

// Máximo de tempos por período, pelas restrições originais (1 tempo = 1 unidade do modelo)
// sel: matérias marcadas no período. dob: quais dessas matérias são dobradinha naquele dia.
const PERIODOS = [
  {dia:'Segunda', turno:'Manhã', ub:3, sel:[], dob:[]},
  {dia:'Segunda', turno:'Tarde', ub:2, sel:[], dob:[]},
  {dia:'Terça',   turno:'Manhã', ub:3, sel:[], dob:[]},
  {dia:'Terça',   turno:'Tarde', ub:1, sel:[], dob:[]},
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
    ['Estatística Multivariada', 'Qualidade de Software', 'Marketing Estratégico'], [],
    ['Pesquisa Operacional e Cálculo Aplicado', 'Pensamento Experimental e Visão de Futuros', 'Marketing Estratégico'],
    [],
    ['Estatística Multivariada', 'Programação Backend'],
    ['Pesquisa Operacional e Cálculo Aplicado'],
    ['Projeto Integrado IV', 'Machine Learning', 'Modelagem em construção de software'],
    ['Qualidade de Software'],
  ][i].map(nome => INDICE[nome]),
  dob: [
    [], ['Análise Preditiva'], [], [], [], [], ['Programação Backend'], [], [], []
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
    ['Programação Web', 'Estatística', 'Engenharia de Software'], [],
    ['Storytelling', 'Banco de dados', 'Fundamentos de Marketing'], ['UX/UI'],
    ['Programação Web', 'Estatística', 'Banco de dados'],
    [], ['Laboratório de Programação', 'Engenharia de Software', 'Colaboração e influência social'], [],
  ][i].map(nome => INDICE_TI2A[nome]).filter(k => k !== undefined),
  dob: [[], [], [], [], [], ['UX/UI'], [], [], [], []][i]
    .map(nome => INDICE_TI2A[nome]).filter(k => k !== undefined),
}));

const TEMPLATE_DIREITO_DR4A_MATERIAS = [
  {nome:'Responsabilidade Civil', lim:'18', usadas:''},
  {nome:'Direito, Negócios e Inovação', lim:'8', usadas:''},
  {nome:'Contabilidade e Finanças I', lim:'8', usadas:''},
  {nome:'Direito Penal I', lim:'20', usadas:''},
  {nome:'Direito das Coisas', lim:'10', usadas:''},
  {nome:'Escritório Padrinho IV', lim:'10', usadas:''},
  {nome:'Direito Empresarial II', lim:'19', usadas:''},
  {nome:'Processo Civil I', lim:'19', usadas:''},
  {nome:'Dados para Tomada de Decisões Jurídicas', lim:'19', usadas:''},
  {nome:'Análise e Solução de Problemas', lim:'9', usadas:''},
  {nome:'Direito Administrativo I', lim:'9', usadas:''},
  {nome:'Metodologia de Pesquisa I', lim:'9', usadas:''},
  {nome:'Pensamento Experimental e Visão de Futuro', lim:'9', usadas:''},
];
const INDICE_DIREITO_DR4A = Object.fromEntries(TEMPLATE_DIREITO_DR4A_MATERIAS.map((m, i) => [m.nome, i]));
const TEMPLATE_DIREITO_DR4A_PERIODOS = GRADE_BASE.map((p, i) => ({...p,
  sel: [
    ['Responsabilidade Civil', 'Direito, Negócios e Inovação', 'Contabilidade e Finanças I'], [],
    ['Responsabilidade Civil', 'Direito Penal I', 'Direito das Coisas'], ['Escritório Padrinho IV'],
    ['Direito Empresarial II', 'Direito Penal I', 'Processo Civil I'], [],
    ['Processo Civil I', 'Direito Empresarial II', 'Dados para Tomada de Decisões Jurídicas'],
    ['Análise e Solução de Problemas'],
    ['Direito Administrativo I', 'Metodologia de Pesquisa I', 'Dados para Tomada de Decisões Jurídicas'],
    ['Pensamento Experimental e Visão de Futuro'],
  ][i].map(nome => INDICE_DIREITO_DR4A[nome]).filter(k => k !== undefined),
  dob: [],
}));

const MATERIAS = [];
const STORAGE_KEY = 'presente.controle.v1';
const TEMPLATES = {
  'grade-base': {nome:'TI4A', materias:TEMPLATE_11_MATERIAS, periodos:TEMPLATE_11_PERIODOS},
  ti2a: {nome:'TI2A', materias:TEMPLATE_TI2A_MATERIAS, periodos:TEMPLATE_TI2A_PERIODOS},
  'direito-dr4a': {nome:'Direito DR4A', materias:TEMPLATE_DIREITO_DR4A_MATERIAS, periodos:TEMPLATE_DIREITO_DR4A_PERIODOS},
  vazio: {nome:'Minha grade', materias:[], periodos:GRADE_BASE},
};

let templateAtual = 'grade-base';
let simulacao = [];
let granularidade = 'turno';
const el = id => document.getElementById(id);

/* ==========================================================================
   Cálculo — nada aqui mudou de comportamento.
   ========================================================================== */

function esc(value){
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function parseNum(value){
  const text = String(value).trim();
  if (!/^\d+$/.test(text)) return null;
  const number = Number(text);
  return Number.isSafeInteger(number) && number >= 0 ? number : null;
}
function rotulo(k){ return MATERIAS[k].nome.trim() || 'Matéria ' + (k + 1); }
function peso(i, k){ return PERIODOS[i].dob.includes(k) ? 2 : 1; }
function faltas(n){ return n + (n === 1 ? ' falta' : ' faltas'); }
function quantidade(n, singular, plural){ return n + ' ' + (n === 1 ? singular : plural); }

function infoMateria(k){
  const m = MATERIAS[k];
  const usadas = parseNum(m.usadas);
  const temLimite = String(m.lim).trim() !== '';
  const limite = temLimite ? parseNum(m.lim) : null;
  const valido = usadas !== null && (!temLimite || limite !== null);
  return {usadas, temLimite, limite, valido, saldo: valido && temLimite ? limite - usadas : null};
}
function capacidadeTempos(k){
  const d = infoMateria(k);
  if (!d.valido) return null;
  return d.temLimite ? Math.max(0, Math.floor(d.saldo / FALTAS_POR_TEMPO)) : Infinity;
}

/* ==========================================================================
   Estado salvo — mesma chave e mesmo formato de antes, para não perder dados.
   ========================================================================== */


function salvar(){
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      versao: 1, template: templateAtual, materias: MATERIAS, gran: granularidade,
      periodos: PERIODOS.map(p => ({sel: p.sel, dob: p.dob})),
    }));
  } catch {
    el('statusSalvo').textContent = 'Este navegador não está guardando seus dados. Se fechar a aba, você digita tudo de novo.';
  }
}
function restaurar(){
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data || data.versao !== 1 || !Object.hasOwn(TEMPLATES, data.template) ||
      !Array.isArray(data.materias) || data.materias.length > 100 ||
      !Array.isArray(data.periodos) || data.periodos.length !== GRADE_BASE.length) return false;
    const validString = value => typeof value === 'string' && value.length <= 200;
    if (!data.materias.every(m => m && validString(m.nome) && validString(m.lim) && validString(m.usadas))) return false;
    const validIndex = k => Number.isInteger(k) && k >= 0 && k < data.materias.length;
    if (!data.periodos.every(p => p && Array.isArray(p.sel) && Array.isArray(p.dob) &&
      p.sel.every(validIndex) && p.dob.every(k => validIndex(k) && p.sel.includes(k)))) return false;
    MATERIAS.splice(0, MATERIAS.length, ...data.materias.map(m => ({nome: m.nome, lim: m.lim, usadas: m.usadas})));
    PERIODOS.splice(0, PERIODOS.length, ...GRADE_BASE.map((p, i) => ({
      ...p, sel: [...new Set(data.periodos[i].sel)], dob: [...new Set(data.periodos[i].dob)],
    })));
    templateAtual = data.template;
    if (typeof data.gran === 'string' && Object.hasOwn(GRANULARIDADES, data.gran)) granularidade = data.gran;
    simulacao = zerarSimulacao();
    el('turma').value = templateAtual;
    return true;
  } catch {
    return false;
  }
}

function aplicarTemplate(nome){
  templateAtual = Object.hasOwn(TEMPLATES, nome) ? nome : 'grade-base';
  const template = TEMPLATES[templateAtual];
  MATERIAS.splice(0, MATERIAS.length, ...template.materias.map(m => ({...m})));
  PERIODOS.splice(0, PERIODOS.length, ...template.periodos.map(p => ({...p, sel: [...p.sel], dob: [...p.dob]})));
  simulacao = zerarSimulacao();
  el('turma').value = templateAtual;
  renderTudo();
}

/* ==========================================================================
   O saldo. A lista é também o editor: cada linha se edita no lugar.
   ========================================================================== */

/* Os traços são a chamada: um por falta permitida, preenchidos até onde você
   já gastou. Acima de 40 traços vira barra, porque deixa de dar para contar. */
function tracos(usadas, limite){
  const temLimite = limite !== null;
  if (temLimite && limite > 40) {
    const largura = limite === 0 ? 100 : Math.min(100, usadas / limite * 100);
    return '<div class="barra" aria-hidden="true"><span style="width:' + largura + '%"></span></div>';
  }
  const total = Math.min(40, temLimite ? Math.max(limite, usadas) : usadas);
  let html = '<div class="tracos" aria-hidden="true">';
  for (let n = 0; n < total; n++) {
    const classe = n >= usadas ? '' : (!temLimite || n < limite) ? 'usada' : 'estouro';
    html += '<i' + (classe ? ' class="' + classe + '"' : '') + '></i>';
  }
  return html + '</div>';
}

function estadoLinha(d){
  if (!d.valido) return 'pendente';
  if (!d.temLimite) return 'livre';
  if (d.saldo < 0) return 'estourado';
  if (d.saldo < FALTAS_POR_TEMPO) return 'apertado';
  return 'ok';
}

/* Quanto ainda cabe, em aulas — que é a unidade em que a pessoa pensa. */
function cabeTexto(d){
  if (!d.valido) return {valor: '—', unidade: 'falta informar'};
  if (!d.temLimite) return {valor: '∞', unidade: 'sem limite'};
  if (d.saldo < 0) return {valor: String(-d.saldo), unidade: d.saldo === -1 ? 'falta acima' : 'faltas acima'};
  const aulas = Math.floor(d.saldo / FALTAS_POR_TEMPO);
  return {valor: String(aulas), unidade: aulas === 1 ? 'aula' : 'aulas'};
}

function renderLedger(){
  el('ledger').innerHTML = MATERIAS.map((m, k) => {
    const d = infoMateria(k);
    const cabe = cabeTexto(d);
    return '<div class="ledger-linha" data-linha="' + k + '" data-estado="' + estadoLinha(d) + '">' +
      '<div class="linha-nome"><input id="nome-' + k + '" data-k="' + k + '" data-f="nome" maxlength="200" ' +
        'value="' + esc(m.nome) + '" placeholder="Nome da matéria" aria-label="Nome da matéria ' + (k + 1) + '"></div>' +
      '<div class="linha-campos">' +
        '<input type="number" min="0" step="1" inputmode="numeric" id="usadas-' + k + '" data-k="' + k + '" data-f="usadas" ' +
          'value="' + esc(m.usadas) + '" placeholder="?" aria-label="Faltas que você já tem em ' + esc(rotulo(k)) + '">' +
        '<span>de</span>' +
        '<input type="number" min="0" step="1" inputmode="numeric" id="lim-' + k + '" data-k="' + k + '" data-f="lim" ' +
          'value="' + esc(m.lim) + '" placeholder="—" aria-label="Limite de faltas em ' + esc(rotulo(k)) + '">' +
      '</div>' +
      '<button class="linha-remover" type="button" data-remover="' + k + '" ' +
        'aria-label="Remover ' + esc(rotulo(k)) + ' da lista">×</button>' +
      '<div class="linha-cabe"><b>' + cabe.valor + '</b><span>' + cabe.unidade + '</span></div>' +
      tracos(d.usadas ?? 0, d.temLimite ? d.limite : null) +
      '<p class="linha-erro" id="erro-' + k + '"></p>' +
    '</div>';
  }).join('') || '<div class="ledger-vazio"><p>Sua grade está vazia. Escolha uma turma no topo ou adicione as matérias uma a uma.</p></div>';

  MATERIAS.forEach((_, k) => validarLinha(k));
}

/* Atualiza só o que é derivado, sem tocar nos campos — o cursor fica onde está. */
function atualizarLinha(k){
  const linha = document.querySelector('[data-linha="' + k + '"]');
  if (!linha) return;
  const d = infoMateria(k);
  const cabe = cabeTexto(d);
  linha.dataset.estado = estadoLinha(d);
  linha.querySelector('.linha-cabe b').textContent = cabe.valor;
  linha.querySelector('.linha-cabe span').textContent = cabe.unidade;
  linha.querySelector('.tracos, .barra').outerHTML = tracos(d.usadas ?? 0, d.temLimite ? d.limite : null);
}

function validarLinha(k){
  const erros = ['usadas', 'lim'].filter(f => {
    const invalido = String(MATERIAS[k][f]).trim() !== '' && parseNum(MATERIAS[k][f]) === null;
    el(f + '-' + k)?.setAttribute('aria-invalid', String(invalido));
    return invalido;
  });
  const campo = el('erro-' + k);
  if (campo) campo.textContent = erros.length ? 'Use um número inteiro, de zero para cima.' : '';
}

/* A linha de aperto substitui a reordenação da lista: aponta o risco sem
   fazer as matérias pularem de lugar enquanto a pessoa digita. */
function renderAperto(){
  const dados = MATERIAS.map((m, k) => ({...infoMateria(k), k}));
  const estourados = dados.filter(d => d.valido && d.temLimite && d.saldo < 0);
  const comLimite = dados.filter(d => d.valido && d.temLimite && d.saldo >= 0);
  const pendentes = dados.filter(d => !d.valido).length;
  const alvo = el('saldoAperto');

  if (!MATERIAS.length) { alvo.innerHTML = ''; return; }
  if (estourados.length) {
    const nomes = estourados.map(d => esc(rotulo(d.k))).join(', ');
    alvo.innerHTML = '<strong>Acima do limite:</strong> ' + nomes + '.';
    return;
  }
  if (pendentes) {
    alvo.innerHTML = pendentes === MATERIAS.length
      ? 'Informe quantas faltas você já tem para ver o saldo.'
      : quantidade(pendentes, 'matéria ainda sem', 'matérias ainda sem') + ' informação.';
    return;
  }
  if (!comLimite.length) { alvo.innerHTML = 'Nenhuma matéria com limite definido.'; return; }
  const pior = comLimite.reduce((a, b) => (b.saldo < a.saldo ? b : a));
  alvo.innerHTML = 'Mais apertada: ' + esc(rotulo(pior.k)) + ', ' + faltas(pior.saldo) + ' de folga.';
}

function renderPrimeiroUso(){
  const emBranco = MATERIAS.filter(m => m.usadas.trim() === '').length;
  el('primeiroUso').hidden = emBranco === 0;
  if (!emBranco) return;
  el('primeiroUsoTexto').textContent = emBranco === MATERIAS.length
    ? 'A grade está pronta. Falta dizer quantas faltas você já tem em cada matéria.'
    : quantidade(emBranco, 'matéria está', 'matérias estão') + ' sem o número de faltas.';
  el('zerarPendentes').textContent = emBranco === MATERIAS.length
    ? 'Ainda não faltei em nenhuma'
    : 'Marcar as que faltam como zero';
}

/* ==========================================================================
   A semana. É a pergunta da página: em quais aulas você pensa em faltar.
   ========================================================================== */

/* ==========================================================================
   Tempos, não turnos.

   Um turno é uma fila ordenada de tempos: PERIODOS[i].sel já guarda as
   matérias na ordem em que caem no dia, e uma matéria em dobradinha ocupa
   dois tempos seguidos. Expandir isso em slots resolve as três
   granularidades com uma conta só — dia, turno e tempo são apenas conjuntos
   de slots diferentes.
   ========================================================================== */

function temposDoTurno(i){
  const p = PERIODOS[i];
  const slots = [];
  p.sel.forEach(k => { for (let n = 0; n < peso(i, k); n++) slots.push(k); });
  return slots;
}

/* simulacao[i][s] = quantas vezes aquele tempo foi marcado. */
function zerarSimulacao(){
  return PERIODOS.map((_, i) => temposDoTurno(i).map(() => 0));
}

/* A grade mudou: preserva o que ainda faz sentido e descarta o resto. */
function sincronizarSimulacao(){
  simulacao = PERIODOS.map((_, i) => {
    const anterior = simulacao[i] || [];
    return temposDoTurno(i).map((_, s) => anterior[s] || 0);
  });
}

function totalMarcado(){
  return simulacao.reduce((soma, turno) => soma + turno.reduce((a, b) => a + b, 0), 0);
}

/* Quantos tempos cada matéria ainda aguenta, já descontando o que está
   marcado agora. null = falta informação; Infinity = sem limite. */
function restanteTempos(){
  const base = MATERIAS.map((_, k) => capacidadeTempos(k));
  PERIODOS.forEach((_, i) => temposDoTurno(i).forEach((k, s) => {
    if (base[k] !== null && base[k] !== Infinity) base[k] -= simulacao[i][s] || 0;
  }));
  return base;
}

/* Quantos tempos uma unidade consome de cada matéria. */
function consumoDaUnidade(slots){
  const consumo = new Map();
  slots.forEach(({i, s}) => {
    const k = temposDoTurno(i)[s];
    if (k === undefined) return;
    consumo.set(k, (consumo.get(k) || 0) + 1);
  });
  return consumo;
}

/* Quantas vezes AINDA cabe faltar esta unidade inteira. O mínimo entre as
   matérias dela: basta uma estourar para a unidade deixar de caber. */
function cabeNaUnidade(slots, restante){
  const consumo = consumoDaUnidade(slots);
  if (!consumo.size) return null;
  let menor = Infinity;
  for (const [k, tempos] of consumo) {
    if (restante[k] === null) return null;
    if (restante[k] === Infinity) continue;
    menor = Math.min(menor, Math.floor(restante[k] / tempos));
  }
  return menor === Infinity ? Infinity : Math.max(0, menor);
}

/* Quantas vezes a unidade já está marcada: o mínimo entre seus slots, para
   que "2×" só apareça quando a unidade inteira foi marcada duas vezes. */
function marcasDaUnidade(slots){
  if (!slots.length) return 0;
  return Math.min(...slots.map(({i, s}) => simulacao[i][s] || 0));
}

/* ==========================================================================
   As três granularidades. Cada uma é uma lista de unidades clicáveis.
   ========================================================================== */

const GRANULARIDADES = {
  dia:   {rotulo: 'Dia todo',        nota: 'Faltar o dia inteiro, manhã e tarde.', unidade: 'um dia'},
  turno: {rotulo: 'Manhã e tarde',   nota: 'Faltar um turno inteiro.',             unidade: 'um turno'},
  tempo: {rotulo: 'Tempo por tempo', nota: 'Faltar uma aula só, na ordem em que ela cai.', unidade: 'uma aula'},
};

function turnosDoDia(dia){
  return ['Manhã', 'Tarde']
    .map(turno => PERIODOS.findIndex(p => p.dia === dia && p.turno === turno))
    .filter(i => i >= 0 && PERIODOS[i].sel.length);
}

/* Cada unidade: id estável, rótulo, os slots que ela consome e, no caso do
   tempo, a matéria que está sendo perdida. */
function unidadesDoDia(dia){
  const turnos = turnosDoDia(dia);

  if (granularidade === 'dia') {
    const slots = turnos.flatMap(i => temposDoTurno(i).map((_, s) => ({i, s})));
    if (!slots.length) return [];
    return [{
      id: 'd-' + dia, titulo: 'Dia todo',
      detalhe: quantidade(slots.length, 'tempo', 'tempos'),
      descricao: dia + ' inteira', slots,
    }];
  }

  if (granularidade === 'turno') {
    return ['Manhã', 'Tarde'].map(turno => {
      const i = PERIODOS.findIndex(p => p.dia === dia && p.turno === turno);
      if (i < 0 || !PERIODOS[i].sel.length) return {vazio: true, titulo: turno};
      const slots = temposDoTurno(i).map((_, s) => ({i, s}));
      return {
        id: 't-' + i, titulo: turno,
        detalhe: quantidade(slots.length, 'tempo', 'tempos'),
        descricao: dia + ' de ' + turno.toLowerCase(), slots,
      };
    });
  }

  // tempo por tempo
  const lista = [];
  ['Manhã', 'Tarde'].forEach(turno => {
    const i = PERIODOS.findIndex(p => p.dia === dia && p.turno === turno);
    if (i < 0 || !PERIODOS[i].sel.length) { lista.push({vazio: true, titulo: turno}); return; }
    lista.push({separador: turno});
    const slots = temposDoTurno(i);
    slots.forEach((k, s) => {
      const dobrado = peso(i, k) > 1;
      const ordinal = (s + 1) + 'º tempo';
      lista.push({
        id: 's-' + i + '-' + s, titulo: ordinal, materia: rotulo(k),
        detalhe: dobrado ? 'dobradinha' : '',
        descricao: dia + ' de ' + turno.toLowerCase() + ', ' + ordinal + ', ' + rotulo(k),
        slots: [{i, s}],
      });
    });
  });
  return lista;
}

/* ==========================================================================
   Risco: a cor acompanha o número de vezes que ainda cabe.
   A cor nunca viaja sozinha — o número e o rótulo vão junto, senão quem não
   distingue cor fica sem a informação.
   ========================================================================== */

function risco(cabe){
  if (cabe === null) return 'pendente';
  if (cabe === Infinity) return 'livre';
  if (cabe === 0) return 'estourado';
  if (cabe === 1) return 'critico';
  if (cabe <= 3) return 'atencao';
  return 'folgado';
}

const LEGENDA = [
  {nivel: 'estourado', texto: 'Não cabe mais'},
  {nivel: 'critico',   texto: 'Cabe só mais uma'},
  {nivel: 'atencao',   texto: 'Cabem 2 ou 3'},
  {nivel: 'folgado',   texto: 'Cabem 4 ou mais'},
];

function renderLegenda(){
  el('legenda').innerHTML = LEGENDA.map(l =>
    '<li><span class="amostra" data-risco="' + l.nivel + '" aria-hidden="true"></span>' + l.texto + '</li>'
  ).join('');
}

function renderGranularidade(){
  el('granularidade').innerHTML = Object.entries(GRANULARIDADES).map(([valor, g]) =>
    '<div class="opcao-gran">' +
      '<input type="radio" name="gran" id="gran-' + valor + '" value="' + valor + '"' +
        (granularidade === valor ? ' checked' : '') + '>' +
      '<label for="gran-' + valor + '"><strong>' + g.rotulo + '</strong><small>' + g.nota + '</small></label>' +
    '</div>'
  ).join('');
}

/* ==========================================================================
   A semana
   ========================================================================== */

function renderSemana(){
  const focoId = document.activeElement?.dataset?.unidade ? document.activeElement.id : null;
  const restante = restanteTempos();

  el('semana').dataset.gran = granularidade;
  el('semana').innerHTML = DIAS.map(dia => {
    const unidades = unidadesDoDia(dia);
    const corpo = unidades.length
      ? unidades.map(u => {
          if (u.separador) return '<span class="faixa-turno">' + u.separador + '</span>';
          if (u.vazio) return '<div class="aula-vazia"><span class="aula-turno">' + u.titulo + '</span><small>sem aula</small></div>';

          const cabe = cabeNaUnidade(u.slots, restante);
          const n = marcasDaUnidade(u.slots);
          const nivel = risco(cabe);
          let numero, rodape, leitura;

          if (cabe === null) {
            numero = '—'; rodape = 'falta informar';
            leitura = 'ainda não dá para calcular';
          } else if (cabe === Infinity) {
            numero = '∞'; rodape = 'sem limite';
            leitura = 'sem limite definido';
          } else if (n > 0) {
            numero = n + '×';
            rodape = cabe === 0 ? 'no limite' : 'cabem mais ' + cabe;
            leitura = n + ' marcadas, ' + (cabe === 0 ? 'no limite' : 'ainda cabem mais ' + cabe);
          } else {
            numero = String(cabe);
            rodape = cabe === 0 ? 'não dá' : cabe === 1 ? 'vez' : 'vezes';
            leitura = cabe === 0 ? 'não cabe mais nenhuma falta' : 'cabem ' + quantidade(cabe, 'falta', 'faltas');
          }

          return '<button class="aula" type="button" id="u-' + u.id + '" data-unidade="' + u.id + '" ' +
            'data-acao="alternar" data-risco="' + nivel + '" aria-pressed="' + (n > 0) + '" ' +
            'aria-label="' + esc(u.descricao) + ': ' + leitura + '">' +
            '<span class="aula-turno">' + esc(u.titulo) + '</span>' +
            (u.materia ? '<span class="aula-materia">' + esc(u.materia) + '</span>' : '') +
            '<span class="aula-num">' + numero + '</span>' +
            '<span class="aula-rodape">' + rodape + (u.detalhe ? ', ' + u.detalhe : '') + '</span>' +
          '</button>';
        }).join('')
      : '<div class="aula-vazia"><small>sem aula</small></div>';
    return '<div class="dia"><span class="dia-nome">' + dia + '</span><div class="dia-unidades">' + corpo + '</div></div>';
  }).join('');

  renderSelecionados();

  const total = totalMarcado();
  el('semanaNota').textContent = total
    ? quantidade(total, 'tempo marcado', 'tempos marcados') + ' — os outros números já descontam isso'
    : 'Os números são o máximo de cada um sozinho. Toque em um para ver os outros recalcularem.';
  el('limpar').hidden = total === 0;

  if (focoId) el(focoId)?.focus({preventScroll: true});
}

function renderSelecionados(){
  const itens = [];
  PERIODOS.forEach((p, i) => temposDoTurno(i).forEach((k, s) => {
    const n = simulacao[i][s] || 0;
    if (!n) return;
    const quando = p.dia + ' de ' + p.turno.toLowerCase();
    itens.push('<div class="selecionado"><span>' + quando + ', ' + (s + 1) + 'º tempo' +
      '<small>' + esc(rotulo(k)) + '</small></span>' +
      '<div class="contador">' +
        '<button type="button" data-i="' + i + '" data-s="' + s + '" data-acao="menos" aria-label="Uma falta a menos em ' + quando + ', ' + (s + 1) + 'º tempo">−</button>' +
        '<span>' + n + '×</span>' +
        '<button type="button" data-i="' + i + '" data-s="' + s + '" data-acao="mais" aria-label="Uma falta a mais em ' + quando + ', ' + (s + 1) + 'º tempo">+</button>' +
      '</div></div>');
  }));
  el('selecionados').innerHTML = itens.join('');
}

function efeitos(){
  const consumo = MATERIAS.map(() => 0);
  PERIODOS.forEach((_, i) => temposDoTurno(i).forEach((k, s) => {
    consumo[k] += (simulacao[i][s] || 0) * FALTAS_POR_TEMPO;
  }));
  return consumo.map((delta, k) => ({...infoMateria(k), k, delta})).filter(d => d.delta > 0).map(d => ({
    ...d,
    depois: d.valido ? d.usadas + d.delta : null,
    excede: d.valido && d.temLimite ? Math.max(0, d.usadas + d.delta - d.limite) : 0,
  }));
}

function renderVeredito(){
  const lista = efeitos();
  const alvo = el('veredito');

  if (!lista.length) {
    alvo.dataset.estado = 'vazio';
    const pendentes = MATERIAS.filter((_, k) => !infoMateria(k).valido).length;
    if (!MATERIAS.length) {
      alvo.innerHTML = '<h2>Comece pelo passo 1.</h2>' +
        '<p class="veredito-nota">Sem turma escolhida não há grade para calcular.</p>';
    } else if (pendentes) {
      alvo.innerHTML = '<h2>Falta o passo 2.</h2>' +
        '<p class="veredito-nota">' + quantidade(pendentes, 'matéria está', 'matérias estão') +
        ' sem o número de faltas. Os turnos acima só mostram o que já dá para calcular.</p>';
    } else {
      alvo.innerHTML = '<h2>Toque em ' + GRANULARIDADES[granularidade].unidade + '.</h2>' +
        '<p class="veredito-nota">O efeito em cada matéria aparece aqui, e o resto da semana recalcula junto.</p>';
    }
    return;
  }

  const pendentes = lista.filter(d => !d.valido).length;
  const semTeto = lista.filter(d => d.valido && !d.temLimite).length;
  const estouram = lista.filter(d => d.excede > 0);
  const folgas = lista.filter(d => d.valido && d.temLimite && !d.excede).map(d => d.limite - d.depois);

  let estado = 'ok';
  let titulo = '';
  let nota = '';

  if (estouram.length) {
    estado = 'estouro';
    titulo = estouram.length === 1
      ? 'Não dá: ' + rotulo(estouram[0].k) + ' passa do limite.'
      : estouram.length + ' matérias passam do limite.';
    nota = 'Se ainda assim faltar, você fica reprovado por falta nessas matérias.';
  } else if (pendentes) {
    estado = 'atencao';
    titulo = 'Não dá para responder ainda.';
    nota = quantidade(pendentes, 'matéria dessa seleção está', 'matérias dessa seleção estão') + ' sem o número de faltas. Preencha no saldo, abaixo.';
  } else if (folgas.length && Math.min(...folgas) === 0) {
    estado = 'atencao';
    titulo = 'Cabe, mas zera sua folga.';
    nota = 'Depois disso, qualquer falta a mais reprova.' + (semTeto ? ' Há também matéria sem limite definido.' : '');
  } else if (folgas.length) {
    estado = 'ok';
    const menor = Math.min(...folgas);
    titulo = 'Cabe.';
    nota = 'A matéria mais apertada ainda fica com ' + faltas(menor) + ' de folga.' + (semTeto ? ' Há matéria sem limite definido nesta seleção.' : '');
  } else {
    estado = 'atencao';
    titulo = 'Sem limite definido.';
    nota = 'Defina o limite das matérias desta seleção para saber se cabe.';
  }

  alvo.dataset.estado = estado;
  alvo.innerHTML = '<h2>' + esc(titulo) + '</h2><p class="veredito-nota">' + esc(nota) + '</p>' +
    lista.map(d => {
      const conta = !d.valido ? 'faltas a informar'
        : d.temLimite ? d.usadas + ' → ' + d.depois + ' de ' + d.limite
        : d.usadas + ' → ' + d.depois;
      const sobra = d.valido && d.temLimite ? d.limite - d.depois : null;
      const veredito = !d.valido ? 'incompleta'
        : !d.temLimite ? 'sem limite'
        : d.excede ? 'passa em ' + faltas(d.excede)
        : sobra === 0 ? 'no limite'
        : 'sobram ' + faltas(sobra);
      return '<div class="efeito"><span class="efeito-materia">' + esc(rotulo(d.k)) + '</span>' +
        '<span class="efeito-conta">' + conta + '</span>' +
        '<span class="efeito-veredito' + (d.excede ? ' ruim' : '') + '">' + veredito + '</span></div>';
    }).join('');
}

/* ==========================================================================
   A grade. Fica fechada porque quase ninguém precisa mexer.
   ========================================================================== */

/* A ordem de PERIODOS[i].sel é a ordem dos tempos no dia. Como ela passou a
   significar algo, precisa estar visível e editável — senão marcar uma
   matéria a joga para o fim da fila sem ninguém perceber. */
function ordemDosTempos(i){
  const p = PERIODOS[i];
  if (p.sel.length < 1) return '';
  let tempo = 1;
  const itens = p.sel.map((k, pos) => {
    const largura = peso(i, k);
    const ordinal = largura > 1 ? tempo + 'º e ' + (tempo + largura - 1) + 'º' : tempo + 'º';
    tempo += largura;
    const mover = (direcao, destino, desativado) =>
      '<button type="button" class="mover" data-mover="' + direcao + '" data-i="' + i + '" data-pos="' + pos + '"' +
      (desativado ? ' disabled' : '') + ' aria-label="Mover ' + esc(rotulo(k)) + ' para ' + destino + '">' +
      (direcao === 'cima' ? '↑' : '↓') + '</button>';
    return '<li><span class="ordem-num">' + ordinal + '</span>' +
      '<span class="ordem-nome">' + esc(rotulo(k)) + '</span>' +
      '<span class="ordem-botoes">' +
        mover('cima', 'antes', pos === 0) +
        mover('baixo', 'depois', pos === p.sel.length - 1) +
      '</span></li>';
  }).join('');
  return '<div class="ordem"><p class="ordem-titulo">Ordem dos tempos no dia</p><ol class="ordem-lista">' + itens + '</ol></div>';
}

function renderGrade(){
  const abertos = new Set([...el('grade').querySelectorAll('details[open]')].map(d => d.dataset.periodo));
  const focoId = el('grade').contains(document.activeElement) ? document.activeElement.id : null;

  el('grade').innerHTML = PERIODOS.map((p, i) =>
    '<details class="turno" data-periodo="' + i + '"' + (abertos.has(String(i)) ? ' open' : '') + '>' +
    '<summary><span>' + p.dia + ' de ' + p.turno.toLowerCase() + '</span>' +
    '<small>' + (p.sel.length ? quantidade(p.sel.length, 'matéria', 'matérias') : 'sem aula') + '</small></summary>' +
    ordemDosTempos(i) +
    '<div class="marcacoes">' + MATERIAS.map((_, k) =>
      '<div class="marcacao"><label><input id="grade-' + i + '-' + k + '" type="checkbox" data-i="' + i + '" data-k="' + k + '"' +
        (p.sel.includes(k) ? ' checked' : '') + '><span data-rotulo="' + k + '">' + esc(rotulo(k)) + '</span></label>' +
      (p.sel.includes(k)
        ? '<label class="dobradinha"><input id="dob-' + i + '-' + k + '" type="checkbox" data-i="' + i + '" data-k="' + k + '" data-d="1"' +
          (p.dob.includes(k) ? ' checked' : '') + '>Dobradinha, dois tempos seguidos</label>'
        : '') + '</div>'
    ).join('') + '</div></details>'
  ).join('') || '<p class="sub">Adicione matérias no saldo antes de montar a grade.</p>';

  if (focoId) el(focoId)?.focus({preventScroll: true});
}

/* ==========================================================================
   Combinação automática — mesma busca de antes.
   ========================================================================== */

function montarPlano(){
  const ativos = PERIODOS.map((p, i) => ({p, i})).filter(({p}) => p.sel.length);
  const alvo = el('resultadoPlano');
  const aviso = texto => { alvo.innerHTML = '<p class="plano-aviso">' + texto + '</p>'; };

  if (!ativos.length) return aviso('A grade está vazia. Marque as matérias de cada turno primeiro.');
  if (ativos.some(({p}) => p.sel.some(k => !infoMateria(k).valido))) {
    return aviso('Falta informação em alguma matéria da grade. Complete o saldo antes de montar a combinação.');
  }
  const capacidade = MATERIAS.map((_, k) => capacidadeTempos(k));
  if (ativos.some(({p}) => p.sel.every(k => capacidade[k] === Infinity))) {
    return aviso('Há turno em que nenhuma matéria tem limite. Defina o limite de pelo menos uma delas para a conta ter um teto.');
  }

  const uso = capacidade.slice();
  const atual = PERIODOS.map(() => 0);
  let melhor = atual.slice(), melhorTotal = -1, visitados = 0, limitado = false;
  const memo = new Map();
  const maximo = p => Math.min(...p.sel.map(k => Math.floor(uso[k] / (p.dob.includes(k) ? 2 : 1))));

  function buscar(pos, total){
    if (++visitados > 50000) { limitado = true; return; }
    if (pos === ativos.length) { if (total > melhorTotal) { melhorTotal = total; melhor = atual.slice(); } return; }
    if (total + ativos.slice(pos).reduce((s, {p}) => s + maximo(p), 0) <= melhorTotal) return;
    const chave = pos + '|' + uso.join(',');
    if ((memo.get(chave) ?? -1) >= total) return;
    memo.set(chave, total);
    const {p, i} = ativos[pos];
    for (let n = maximo(p); n >= 0; n--) {
      atual[i] = n;
      p.sel.forEach(k => { uso[k] -= n * peso(i, k); });
      buscar(pos + 1, total + n);
      p.sel.forEach(k => { uso[k] += n * peso(i, k); });
      if (limitado) break;
    }
    atual[i] = 0;
  }
  buscar(0, 0);

  const consumo = MATERIAS.map(() => 0);
  ativos.forEach(({p, i}) => p.sel.forEach(k => { consumo[k] += melhor[i] * peso(i, k) * FALTAS_POR_TEMPO; }));

  alvo.innerHTML =
    '<p class="plano-total">' + quantidade(melhorTotal, 'aula', 'aulas') + ' no total</p>' +
    '<p class="plano-aviso">Uma distribuição possível do seu saldo pela grade, sem estourar nenhum limite.' +
      (limitado ? ' Pode haver combinações melhores: a busca parou antes de testar todas.' : '') + '</p>' +
    '<table class="plano-tabela"><thead><tr><th scope="col">Turno</th><th scope="col">Nesta combinação</th></tr></thead><tbody>' +
    ativos.map(({p, i}) =>
      '<tr><td>' + p.dia + ' de ' + p.turno.toLowerCase() + '<small>' + p.sel.map(k => esc(rotulo(k))).join(', ') + '</small></td>' +
      '<td>' + (melhor[i] ? quantidade(melhor[i], 'vez', 'vezes') : '—') + '</td></tr>'
    ).join('') + '</tbody></table>' +
    '<table class="plano-tabela"><thead><tr><th scope="col">Matéria</th><th scope="col">Faltas usadas</th></tr></thead><tbody>' +
    MATERIAS.map((_, k) => ({k, delta: consumo[k]})).filter(d => ativos.some(({p}) => p.sel.includes(d.k)))
      .map(d => '<tr><td>' + esc(rotulo(d.k)) + '</td><td>' + faltas(d.delta) + '</td></tr>').join('') +
    '</tbody></table>';
}

function invalidarPlano(){
  if (el('resultadoPlano').innerHTML) {
    el('resultadoPlano').innerHTML = '<p class="plano-aviso">Seus dados mudaram. Monte a combinação de novo.</p>';
  }
}

/* ==========================================================================
   Tema

   O rótulo do botão diz o que acontece ao usá-lo, não o estado atual — "Modo
   escuro" leva ao escuro. Estado atual quem conta é a tela.
   ========================================================================== */

const TEMA_KEY = 'saldo.tema';
const prefereEscuro = matchMedia('(prefers-color-scheme: dark)');

const SOL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
  '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const LUA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

function temaAtual(){
  return document.documentElement.dataset.tema === 'escuro' ? 'escuro' : 'claro';
}

function renderTema(){
  const vaiPara = temaAtual() === 'escuro' ? 'claro' : 'escuro';
  const texto = vaiPara === 'escuro' ? 'Modo escuro' : 'Modo claro';
  el('tema').innerHTML = (vaiPara === 'escuro' ? LUA : SOL) +
    '<span class="btn-tema-texto">' + texto + '</span>';
  el('tema').setAttribute('aria-label', 'Mudar para o ' + texto.toLowerCase());
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', temaAtual() === 'escuro' ? '#12141a' : '#2b4fd8');
}

function aplicarTema(tema, escolhido){
  document.documentElement.dataset.tema = tema === 'escuro' ? 'escuro' : 'claro';
  if (escolhido) { try { localStorage.setItem(TEMA_KEY, tema); } catch { /* sem storage */ } }
  renderTema();
}

function temaFoiEscolhido(){
  try { return localStorage.getItem(TEMA_KEY) !== null; } catch { return false; }
}

el('tema').addEventListener('click', () => {
  aplicarTema(temaAtual() === 'escuro' ? 'claro' : 'escuro', true);
});

/* Enquanto a pessoa não escolher, o sistema continua mandando — inclusive se
   ele trocar sozinho ao anoitecer. */
prefereEscuro.addEventListener('change', e => {
  if (!temaFoiEscolhido()) aplicarTema(e.matches ? 'escuro' : 'claro', false);
});

renderTema();

/* ==========================================================================
   Render e eventos
   ========================================================================== */

function renderEstado(){
  const turma = TEMPLATES[templateAtual].nome;
  el('topoEstado').innerHTML = MATERIAS.length
    ? '<b>' + esc(turma) + '</b>, ' + quantidade(MATERIAS.length, 'matéria', 'matérias')
    : '<b>' + esc(turma) + '</b>';
  el('passo1').dataset.pronto = MATERIAS.length ? 'sim' : 'nao';
  el('passo2').dataset.pronto = MATERIAS.length && MATERIAS.every((_, k) => infoMateria(k).valido) ? 'sim' : 'nao';
  el('passo3').dataset.pronto = el('passo2').dataset.pronto;
}

/* A semana entra aqui: mudar uma falta no passo 2 tem que mexer no passo 3
   na hora, senão os números mentem até alguém clicar. */
function recalcular(){ renderAperto(); renderPrimeiroUso(); renderSemana(); renderVeredito(); renderEstado(); }

function renderTudo(){
  renderGranularidade(); renderLegenda();
  renderLedger(); renderGrade(); recalcular(); invalidarPlano();
}

/* ==========================================================================
   Levar a pessoa para o passo seguinte.
   O salto é uma vez só: depois que ela já viu o passo 3, editar uma falta não
   pode mais arrastar a página embaixo do dedo dela.
   ========================================================================== */

let jaLevouAoPasso3 = false;

function irPara(idPasso, alvoFoco){
  const passo = el(idPasso);
  if (!passo) return;
  passo.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  });
  const alvo = alvoFoco || passo.querySelector('h2');
  if (!alvo) return;
  if (!alvo.hasAttribute('tabindex') && !/^(INPUT|BUTTON|SELECT)$/.test(alvo.tagName)) {
    alvo.setAttribute('tabindex', '-1');
  }
  alvo.focus({preventScroll: true});
}

function primeiroCampoVazio(){
  const k = MATERIAS.findIndex(m => m.usadas.trim() === '');
  return k >= 0 ? el('usadas-' + k) : null;
}

function tudoPreenchido(){
  return MATERIAS.length > 0 &&
    MATERIAS.every((m, k) => m.usadas.trim() !== '' && infoMateria(k).valido);
}

function removerMateria(k){
  MATERIAS.splice(k, 1);
  PERIODOS.forEach((p, i) => {
    p.sel = p.sel.filter(n => n !== k).map(n => (n > k ? n - 1 : n));
    p.dob = p.dob.filter(n => n !== k).map(n => (n > k ? n - 1 : n));
  });
  sincronizarSimulacao();
  renderTudo(); salvar();
}

el('trocarTurma').addEventListener('click', () => {
  aplicarTemplate(el('turma').value);
  salvar();
  jaLevouAoPasso3 = false;
  irPara('passo2', primeiroCampoVazio() || el('addMat'));
});

el('zerarPendentes').addEventListener('click', () => {
  MATERIAS.forEach((m, k) => {
    if (m.usadas.trim() === '') {
      m.usadas = '0';
      const campo = el('usadas-' + k);
      if (campo) campo.value = '0';
      atualizarLinha(k);
      validarLinha(k);
    }
  });
  recalcular(); invalidarPlano(); salvar();
  jaLevouAoPasso3 = true;
  irPara('passo3');
});

el('addMat').addEventListener('click', () => {
  MATERIAS.push({nome: '', lim: '', usadas: ''});
  jaLevouAoPasso3 = false;
  renderTudo(); salvar();
  el('nome-' + (MATERIAS.length - 1))?.focus();
});

/* 2b. Ao sair do último campo que faltava, a resposta vem buscar a pessoa.
   'change' só dispara quando o campo perde o foco ou a pessoa aperta Enter,
   então digitar "1" antes do "18" não arrasta a página. */
el('ledger').addEventListener('change', e => {
  if (!['usadas', 'lim'].includes(e.target.dataset.f)) return;
  if (jaLevouAoPasso3 || !tudoPreenchido()) return;
  jaLevouAoPasso3 = true;
  irPara('passo3');
});

el('ledger').addEventListener('click', e => {
  const k = e.target.closest('[data-remover]')?.dataset.remover;
  if (k !== undefined) removerMateria(+k);
});

el('ledger').addEventListener('input', e => {
  const {k, f} = e.target.dataset;
  if (k === undefined || !['nome', 'usadas', 'lim'].includes(f) || !MATERIAS[+k]) return;
  MATERIAS[+k][f] = e.target.value;
  if (f === 'nome') {
    el('grade').querySelectorAll('[data-rotulo="' + k + '"]').forEach(n => { n.textContent = rotulo(+k); });
  } else {
    validarLinha(+k);
    atualizarLinha(+k);
  }
  recalcular(); invalidarPlano(); salvar();
});

el('grade').addEventListener('click', e => {
  const botao = e.target.closest('[data-mover]');
  if (!botao) return;
  const i = +botao.dataset.i, pos = +botao.dataset.pos;
  const destino = botao.dataset.mover === 'cima' ? pos - 1 : pos + 1;
  const sel = PERIODOS[i]?.sel;
  if (!sel || destino < 0 || destino >= sel.length) return;
  [sel[pos], sel[destino]] = [sel[destino], sel[pos]];
  /* Trocar a ordem muda a que matéria cada tempo marcado se refere, então a
     seleção é descartada em vez de passar a apontar para outra aula. */
  simulacao = zerarSimulacao();
  renderGrade(); recalcular(); invalidarPlano(); salvar();
});

el('grade').addEventListener('change', e => {
  const {i, k, d} = e.target.dataset;
  if (i === undefined || k === undefined || !PERIODOS[+i] || !MATERIAS[+k]) return;
  const p = PERIODOS[+i], chave = +k;
  if (d) p.dob = e.target.checked ? [...new Set([...p.dob, chave])] : p.dob.filter(n => n !== chave);
  else if (e.target.checked) p.sel = [...new Set([...p.sel, chave])];
  else { p.sel = p.sel.filter(n => n !== chave); p.dob = p.dob.filter(n => n !== chave); }
  sincronizarSimulacao();
  renderGrade(); renderSemana(); recalcular(); invalidarPlano(); salvar();
});

function unidadePorId(id){
  for (const dia of DIAS) {
    const achada = unidadesDoDia(dia).find(u => u.id === id);
    if (achada) return achada;
  }
  return null;
}

function mudarSimulacao(e){
  const botao = e.target.closest('button[data-acao]');
  if (!botao) return;

  if (botao.dataset.unidade) {
    const u = unidadePorId(botao.dataset.unidade);
    if (!u?.slots?.length) return;
    const ligado = marcasDaUnidade(u.slots) > 0;
    u.slots.forEach(({i, s}) => { simulacao[i][s] = ligado ? 0 : 1; });
  } else {
    const i = +botao.dataset.i, s = +botao.dataset.s;
    if (simulacao[i]?.[s] === undefined) return;
    simulacao[i][s] = Math.max(0, simulacao[i][s] + (botao.dataset.acao === 'mais' ? 1 : -1));
  }
  renderSemana(); renderVeredito();
}
el('semana').addEventListener('click', mudarSimulacao);
el('selecionados').addEventListener('click', mudarSimulacao);

el('limpar').addEventListener('click', () => {
  simulacao = zerarSimulacao();
  renderSemana(); renderVeredito();
  el('semana').querySelector('button')?.focus({preventScroll: true});
});

el('granularidade').addEventListener('change', e => {
  if (e.target.name !== 'gran' || !Object.hasOwn(GRANULARIDADES, e.target.value)) return;
  granularidade = e.target.value;
  renderSemana(); renderVeredito(); salvar();
});

el('gerarPlano').addEventListener('click', montarPlano);

if (restaurar()) renderTudo(); else aplicarTemplate('grade-base');

/* Quem volta com tudo preenchido já conhece o passo 3: corrigir uma falta não
   deve mandar a página embora. */
jaLevouAoPasso3 = tudoPreenchido();
