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
let mostrarTodas = false;
let simulacao = PERIODOS.map(() => 0);
const el = id => document.getElementById(id);

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
  return {usadas, temLimite, limite, valido, saldo:valido && temLimite ? limite - usadas : null};
}
function capacidadeTempos(k){
  const d = infoMateria(k);
  if (!d.valido) return null;
  return d.temLimite ? Math.max(0, Math.floor(d.saldo / FALTAS_POR_TEMPO)) : Infinity;
}

function aplicarTemplate(nome){
  templateAtual = Object.hasOwn(TEMPLATES, nome) ? nome : 'grade-base';
  const template = TEMPLATES[templateAtual];
  MATERIAS.splice(0, MATERIAS.length, ...template.materias.map(m => ({...m})));
  PERIODOS.splice(0, PERIODOS.length, ...template.periodos.map(p => ({...p, sel:[...p.sel], dob:[...p.dob]})));
  simulacao = PERIODOS.map(() => 0);
  mostrarTodas = false;
  el('template').value = templateAtual;
  renderTudo();
}

function salvar(){
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      versao:1, template:templateAtual, materias:MATERIAS,
      periodos:PERIODOS.map(p => ({sel:p.sel, dob:p.dob})),
    }));
    el('saveStatus').textContent = 'Salvo neste navegador';
  } catch {
    el('saveStatus').textContent = 'Salvamento indisponível neste navegador';
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
    MATERIAS.splice(0, MATERIAS.length, ...data.materias.map(m => ({nome:m.nome, lim:m.lim, usadas:m.usadas})));
    PERIODOS.splice(0, PERIODOS.length, ...GRADE_BASE.map((p, i) => ({
      ...p, sel:[...new Set(data.periodos[i].sel)], dob:[...new Set(data.periodos[i].dob)],
    })));
    templateAtual = data.template;
    simulacao = PERIODOS.map(() => 0);
    el('template').value = templateAtual;
    el('saveStatus').textContent = 'Dados recuperados deste navegador';
    return true;
  } catch {
    el('saveStatus').textContent = 'Salvamento indisponível neste navegador';
    return false;
  }
}

function renderMaterias(){
  el('materias').innerHTML = MATERIAS.map((m, k) =>
    '<div class="subject-editor"><div class="subject-editor-index">MATÉRIA ' + String(k + 1).padStart(2, '0') + '</div>' +
    '<div class="field"><label for="nome-' + k + '">Nome da matéria</label><input id="nome-' + k + '" data-k="' + k + '" data-f="nome" maxlength="200" value="' + esc(m.nome) + '" placeholder="Ex.: Direito Penal I"></div>' +
    '<div class="editor-numbers">' + ['usadas','lim'].map(f =>
      '<div class="field"><label for="' + f + '-' + k + '">' + (f === 'usadas' ? 'Já faltei (faltas)' : 'Limite (faltas)') + '</label>' +
      '<input type="number" min="0" step="1" inputmode="numeric" id="' + f + '-' + k + '" data-k="' + k + '" data-f="' + f + '" value="' + esc(m[f]) + '" placeholder="' + (f === 'usadas' ? 'A informar' : 'Sem limite') + '" aria-describedby="erro-' + f + '-' + k + '">' +
      '<p class="field-error" id="erro-' + f + '-' + k + '"></p></div>'
    ).join('') + '</div></div>'
  ).join('') || '<p class="empty-state">Sua grade começa aqui. Adicione a primeira matéria.</p>';
  MATERIAS.forEach((_, k) => ['usadas','lim'].forEach(f => validarCampo(k, f)));
}
function validarCampo(k, f){
  const field = el(f + '-' + k);
  const invalid = String(MATERIAS[k][f]).trim() !== '' && parseNum(MATERIAS[k][f]) === null;
  field.setAttribute('aria-invalid', String(invalid));
  el('erro-' + f + '-' + k).textContent = invalid ? 'Use um número inteiro, igual ou maior que zero.' : '';
}
function renderGrade(){
  const abertos = new Set([...el('grade').querySelectorAll('details[open]')].map(d => d.dataset.periodo));
  const focusId = el('grade').contains(document.activeElement) ? document.activeElement.id : null;
  el('grade').innerHTML = PERIODOS.map((p, i) =>
    '<details class="grade-period" data-periodo="' + i + '"' + (abertos.has(String(i)) ? ' open' : '') + '><summary>' +
    '<span>' + p.dia + ' · ' + p.turno + '</span><small>' + (p.sel.length ? quantidade(p.sel.length, 'matéria selecionada', 'matérias selecionadas') : 'Nenhuma matéria') + '</small></summary>' +
    '<div class="checks">' + MATERIAS.map((_, k) =>
      '<div class="chk"><label><input id="grade-' + i + '-' + k + '" type="checkbox" data-i="' + i + '" data-k="' + k + '"' + (p.sel.includes(k) ? ' checked' : '') + '>' + esc(rotulo(k)) + '</label>' +
      (p.sel.includes(k) ? '<label class="dob"><input id="dob-' + i + '-' + k + '" type="checkbox" data-i="' + i + '" data-k="' + k + '" data-d="1"' + (p.dob.includes(k) ? ' checked' : '') + '>Dobradinha · 2 tempos</label>' : '') + '</div>'
    ).join('') + '</div></details>'
  ).join('');
  if (focusId) el(focusId)?.focus({preventScroll:true});
}
function renderSaldo(){
  const dados = MATERIAS.map((m, k) => ({...infoMateria(k), k}));
  const pendentes = dados.filter(d => !d.valido).length;
  const emBranco = MATERIAS.filter(m => m.usadas.trim() === '').length;
  el('boasVindas').hidden = emBranco === 0;
  el('bemVindoTitulo').textContent = emBranco === MATERIAS.length
    ? 'A grade está pronta. E as suas faltas?'
    : 'Falta conferir ' + emBranco + (emBranco === 1 ? ' matéria.' : ' matérias.');
  el('zerarPendentes').textContent = emBranco === MATERIAS.length ? 'Ainda não faltei' : 'Não faltei nas pendentes';
  el('saldoResumo').textContent = pendentes
    ? pendentes + (pendentes === 1 ? ' matéria precisa' : ' matérias precisam') + ' de informação para calcular o saldo.'
    : MATERIAS.length ? 'As matérias mais próximas do limite aparecem primeiro.' : 'Escolha uma turma ou monte a sua grade.';
  function prioridade(d){ return d.valido && d.temLimite && d.saldo <= 2 ? 0 : !d.valido ? 1 : d.temLimite ? 2 : 3; }
  dados.sort((a,b) => prioridade(a) - prioridade(b) || (a.saldo ?? Infinity) - (b.saldo ?? Infinity) || a.k - b.k);
  const visiveis = mostrarTodas ? dados : dados.slice(0, 3);
  el('saldoMaterias').innerHTML = visiveis.map(d => {
    const state = !d.valido ? 'pending' : d.temLimite && d.saldo < 0 ? 'danger' : d.temLimite && d.saldo <= 2 ? 'warning' : 'normal';
    const number = !d.valido ? '—' : !d.temLimite ? '∞' : String(d.saldo).replace('-', '−');
    const caption = !d.valido ? 'falta informar' : !d.temLimite ? 'sem teto definido' : 'faltas de saldo';
    const detail = !d.valido ? 'Confira as faltas e o limite desta matéria.'
      : d.temLimite ? d.usadas + ' de ' + d.limite + ' faltas usadas' : faltas(d.usadas) + ' registradas';
    const status = !d.valido ? 'A conferir' : !d.temLimite ? 'Limite não definido' : d.saldo < 0
      ? 'Acima do limite' : d.saldo === 0 ? 'No limite' : d.saldo < 2 ? 'Não cabe um tempo inteiro' : quantidade(Math.floor(d.saldo / 2), 'tempo de aula', 'tempos de aula');
    const width = d.valido && d.temLimite ? (d.limite === 0 ? 100 : Math.min(100, d.usadas / d.limite * 100)) : 0;
    return '<article class="subject-card" data-state="' + state + '"><div class="subject-topline"><h3 class="subject-name">' + esc(rotulo(d.k)) + '</h3><div class="subject-saldo"><b>' + number + '</b><span>' + caption + '</span></div></div>' +
      '<div class="meter" aria-hidden="true"><span style="width:' + width + '%"></span></div><div class="subject-caption"><span>' + esc(detail) + '</span><strong>' + status + '</strong></div></article>';
  }).join('') || '<p class="empty-state">Nenhuma matéria por aqui ainda.</p>';
  el('verTodas').hidden = dados.length <= 3;
  el('verTodas').setAttribute('aria-expanded', String(mostrarTodas));
  el('verTodas').textContent = mostrarTodas ? 'Mostrar só o resumo' : 'Ver todas as ' + dados.length + ' matérias';
}
function renderSemana(){
  const focus = document.activeElement;
  const focoSimulacao = focus?.dataset?.action ? {i:focus.dataset.i, action:focus.dataset.action} : null;
  el('semanaSimulacao').innerHTML = DIAS.map((dia, d) =>
    '<div class="week-day"><span class="day-name" aria-label="' + dia + '">' + ['SEG','TER','QUA','QUI','SEX'][d] + '</span>' +
    ['Manhã','Tarde'].map(turno => {
      const i = PERIODOS.findIndex(p => p.dia === dia && p.turno === turno);
      const p = PERIODOS[i];
      if (!p || !p.sel.length) return '<div class="empty-period"><span>' + turno + '</span><small>Livre na grade</small></div>';
      return '<button class="period-button" type="button" data-i="' + i + '" data-action="toggle" aria-pressed="' + (simulacao[i] > 0) + '" aria-label="' + dia + ' ' + turno + ', ' + quantidade(p.sel.length, 'matéria', 'matérias') + '"><span>' + turno + '</span><small>' + quantidade(p.sel.length, 'matéria', 'matérias') + '</small></button>';
    }).join('') + '</div>'
  ).join('');
  el('periodosSelecionados').innerHTML = PERIODOS.map((p,i) => ({p,i})).filter(({i}) => simulacao[i] > 0).map(({p,i}) =>
    '<div class="selected-period"><span>' + p.dia + ' · ' + p.turno.toLowerCase() + '</span><div class="stepper"><button type="button" data-i="' + i + '" data-action="minus" aria-label="Remover uma ausência de ' + p.dia + ' ' + p.turno + '">−</button><span aria-label="' + simulacao[i] + ' ausências">' + simulacao[i] + '×</span><button type="button" data-i="' + i + '" data-action="plus" aria-label="Adicionar uma ausência de ' + p.dia + ' ' + p.turno + '">+</button></div></div>'
  ).join('');
  el('limparSimulacao').hidden = !simulacao.some(n => n > 0);
  if (focoSimulacao) {
    const target = document.querySelector('[data-i="' + focoSimulacao.i + '"][data-action="' + focoSimulacao.action + '"]') ||
      document.querySelector('[data-i="' + focoSimulacao.i + '"][data-action="toggle"]');
    target?.focus({preventScroll:true});
  }
}
function obterSimulacao(){
  const consumo = MATERIAS.map(() => 0);
  PERIODOS.forEach((p,i) => p.sel.forEach(k => { consumo[k] += simulacao[i] * peso(i,k) * FALTAS_POR_TEMPO; }));
  return consumo.map((delta,k) => ({...infoMateria(k), k, delta})).filter(d => d.delta > 0).map(d => ({
    ...d, depois:d.valido ? d.usadas + d.delta : null,
    excede:d.valido && d.temLimite ? Math.max(0,d.usadas + d.delta - d.limite) : 0,
  }));
}
function renderSimulacao(){
  const efeitos = obterSimulacao();
  const result = el('resultadoSimulacao');
  const pendentes = efeitos.filter(d => !d.valido).length;
  const semTeto = efeitos.filter(d => d.valido && !d.temLimite).length;
  const excedem = efeitos.filter(d => d.excede > 0).length;
  const noLimite = efeitos.filter(d => d.valido && d.temLimite && d.depois === d.limite).length;
  let title = 'Escolha um turno. A gente faz a conta.';
  let description = 'Veja o impacto em cada matéria antes de decidir.';
  let state = 'empty';
  if (efeitos.length) {
    if (excedem) { title = excedem + (excedem === 1 ? ' matéria ultrapassa' : ' matérias ultrapassam') + ' o limite.'; state = 'danger'; }
    else if (pendentes) { title = 'Falta conferir os dados para concluir.'; state = 'warning'; }
    else if (semTeto) { title = 'Há matérias sem limite definido.'; state = 'warning'; }
    else if (noLimite) { title = 'Cabe no limite. Mas fica sem folga.'; state = 'warning'; }
    else { title = 'A seleção cabe nos limites informados.'; state = 'good'; }
    description = 'Este é o efeito combinado de todos os turnos selecionados.' +
      (pendentes ? ' Confira ' + quantidade(pendentes, 'matéria', 'matérias') + ' com dados pendentes.' : '') +
      (semTeto ? ' Defina os limites que faltam para verificar todos os tetos.' : '');
  }
  result.dataset.state = state;
  result.innerHTML = '<p class="result-kicker">' + (efeitos.length ? 'RESULTADO DO TESTE' : 'SEU CENÁRIO COMEÇA AQUI') + '</p><h3>' + title + '</h3><p class="result-description">' + description + '</p>' +
    efeitos.map(d => {
      const value = !d.valido ? 'Faltas ou limite a conferir' : d.usadas + ' → ' + d.depois + (d.temLimite ? ' de ' + d.limite + ' faltas' : ' faltas registradas');
      const sobra = d.valido && d.temLimite ? d.limite - d.depois : null;
      const status = !d.valido ? 'Falta informar' : !d.temLimite ? 'Sem teto definido' : d.excede ? 'Excede em ' + faltas(d.excede) : d.depois === d.limite ? 'No limite' : (sobra === 1 ? 'Sobra ' : 'Sobram ') + faltas(sobra);
      return '<div class="effect-row"><div>' + esc(rotulo(d.k)) + '<strong>' + value + '</strong></div><span class="effect-status' + (d.excede ? ' danger' : '') + '">' + status + '</span></div>';
    }).join('');
}
function calcular(){ renderSaldo(); renderSimulacao(); }
function invalidarPlano(){
  if (el('resultadoPlano').innerHTML) el('resultadoPlano').innerHTML = '<p class="plan-notice">Seus dados mudaram. Monte a combinação novamente para atualizar o resultado.</p>';
}
function renderTudo(){
  el('turmaAtual').textContent = TEMPLATES[templateAtual].nome;
  el('notaTemplate').hidden = templateAtual !== 'direito-dr4a';
  renderMaterias(); renderGrade(); renderSemana(); calcular(); invalidarPlano();
}

function montarPlano(){
  const ativos = PERIODOS.map((p,i) => ({p,i})).filter(({p}) => p.sel.length);
  const result = el('resultadoPlano');
  const aviso = text => { result.innerHTML = '<p class="plan-notice">' + text + '</p>'; };
  if (!ativos.length) return aviso('Sua grade está vazia. Adicione as matérias aos períodos primeiro.');
  if (ativos.some(({p}) => p.sel.some(k => !infoMateria(k).valido))) return aviso('Informe as faltas atuais e corrija os campos pendentes das matérias da grade antes de montar a combinação.');
  const capacidade = MATERIAS.map((_,k) => capacidadeTempos(k));
  if (ativos.some(({p}) => p.sel.every(k => capacidade[k] === Infinity))) return aviso('Há um período sem nenhum teto definido. Defina o limite de pelo menos uma matéria desse período para calcular uma combinação finita.');
  const uso = capacidade.slice();
  const atual = PERIODOS.map(() => 0);
  let melhor = atual.slice(), melhorTotal = -1, visitados = 0, limitado = false;
  const memo = new Map();
  function maximo(p){ return Math.min(...p.sel.map(k => Math.floor(uso[k] / (p.dob.includes(k) ? 2 : 1)))); }
  function buscar(pos, total){
    if (++visitados > 50000) { limitado = true; return; }
    if (pos === ativos.length) { if (total > melhorTotal) { melhorTotal = total; melhor = atual.slice(); } return; }
    const upper = ativos.slice(pos).reduce((s,{p}) => s + maximo(p), 0);
    if (total + upper <= melhorTotal) return;
    const key = pos + '|' + uso.join(',');
    if ((memo.get(key) ?? -1) >= total) return;
    memo.set(key, total);
    const {p,i} = ativos[pos];
    for (let n = maximo(p); n >= 0; n--) {
      atual[i] = n;
      p.sel.forEach(k => { uso[k] -= n * peso(i,k); });
      buscar(pos + 1, total + n);
      p.sel.forEach(k => { uso[k] += n * peso(i,k); });
      if (limitado) break;
    }
    atual[i] = 0;
  }
  buscar(0,0);
  const consumo = MATERIAS.map(() => 0);
  ativos.forEach(({p,i}) => p.sel.forEach(k => { consumo[k] += melhor[i] * peso(i,k) * 2; }));
  result.innerHTML = '<div class="plan-heading">' + quantidade(melhorTotal, 'período completo', 'períodos completos') + '</div><p class="plan-notice">Uma distribuição possível do seu saldo, usando a grade cadastrada. Os números abaixo já compartilham os limites das matérias.' +
    (limitado ? ' Pode haver outras combinações com mais períodos.' : '') + '</p><table class="plan-table"><thead><tr><th scope="col">Período</th><th scope="col">Nesta combinação</th></tr></thead><tbody>' +
    ativos.map(({p,i}) => '<tr><td>' + p.dia + ' · ' + p.turno.toLowerCase() + '<small>' + p.sel.map(k => esc(rotulo(k))).join(' · ') + '</small></td><td>' + (melhor[i] ? quantidade(melhor[i], 'vez', 'vezes') : 'Fora desta combinação') + '</td></tr>').join('') +
    '</tbody></table><details class="grade-details"><summary>Consumo por matéria <span aria-hidden="true">+</span></summary><table class="plan-table"><thead><tr><th scope="col">Matéria</th><th scope="col">Faltas usadas no plano</th></tr></thead><tbody>' +
    MATERIAS.map((_,k) => ({k,delta:consumo[k]})).filter(d => ativos.some(({p}) => p.sel.includes(d.k))).map(d => '<tr><td>' + esc(rotulo(d.k)) + '</td><td>' + faltas(d.delta) + '</td></tr>').join('') + '</tbody></table></details>';
}

function abrirConfiguracao(target){
  el('configuracao').open = true;
  const destination = el(target || 'configuracao');
  destination.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start'});
}
document.querySelectorAll('[data-open-config]').forEach(button => button.addEventListener('click', () => { el('configuracao').open = true; }));
document.querySelectorAll('[data-edit-materias]').forEach(button => button.addEventListener('click', () => abrirConfiguracao('editarMaterias')));
el('carregarTemplate').addEventListener('click', () => { aplicarTemplate(el('template').value); salvar(); });
el('zerarPendentes').addEventListener('click', () => {
  MATERIAS.forEach(m => { if (m.usadas.trim() === '') m.usadas = '0'; });
  renderMaterias(); calcular(); invalidarPlano(); salvar();
});
el('verTodas').addEventListener('click', () => { mostrarTodas = !mostrarTodas; renderSaldo(); });
el('materias').addEventListener('input', e => {
  const {k,f} = e.target.dataset;
  if (k === undefined || !['nome','usadas','lim'].includes(f) || !MATERIAS[+k]) return;
  MATERIAS[+k][f] = e.target.value;
  if (f === 'nome') renderGrade(); else validarCampo(+k,f);
  calcular(); invalidarPlano(); salvar();
});
el('grade').addEventListener('change', e => {
  const {i,k,d} = e.target.dataset;
  if (i === undefined || k === undefined || !PERIODOS[+i] || !MATERIAS[+k]) return;
  const p = PERIODOS[+i], key = +k;
  if (d) p.dob = e.target.checked ? [...new Set([...p.dob,key])] : p.dob.filter(n => n !== key);
  else if (e.target.checked) p.sel = [...new Set([...p.sel,key])];
  else { p.sel = p.sel.filter(n => n !== key); p.dob = p.dob.filter(n => n !== key); }
  if (!p.sel.length) simulacao[+i] = 0;
  renderGrade(); renderSemana(); calcular(); invalidarPlano(); salvar();
});
function mudarSimulacao(e){
  const button = e.target.closest('button[data-action]');
  if (!button) return;
  const i = +button.dataset.i;
  if (!PERIODOS[i]?.sel.length) return;
  if (button.dataset.action === 'toggle') simulacao[i] = simulacao[i] ? 0 : 1;
  else simulacao[i] = Math.max(0,simulacao[i] + (button.dataset.action === 'plus' ? 1 : -1));
  renderSemana(); renderSimulacao();
}
el('semanaSimulacao').addEventListener('click', mudarSimulacao);
el('periodosSelecionados').addEventListener('click', mudarSimulacao);
el('limparSimulacao').addEventListener('click', () => {
  simulacao.fill(0); renderSemana(); renderSimulacao(); el('semanaSimulacao').querySelector('button')?.focus({preventScroll:true});
});
el('addMat').addEventListener('click', () => {
  MATERIAS.push({nome:'',lim:'',usadas:''});
  renderTudo(); salvar();
  el('nome-' + (MATERIAS.length - 1)).focus();
});
el('gerarPlano').addEventListener('click', montarPlano);

if (restaurar()) renderTudo(); else aplicarTemplate('grade-base');
if (location.hash === '#configuracao') el('configuracao').open = true;
