const mesesNomes = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let dataAtual = new Date();
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();

const monthsTabs = document.getElementById('monthsTabs');
const mesAnoTitulo = document.getElementById('mesAnoTitulo');
const calendarDays = document.getElementById('calendarDays');
const detalhesTitulo = document.getElementById('detalhesTitulo');
const tbodyDetalhes = document.getElementById('tbodyDetalhes');

// Funções utilitárias
function formatarHora(dataStr) {
    if (!dataStr) return '-';
    const partes = dataStr.split(' ');
    if (partes.length === 2) {
        return partes[1].substring(0, 5);
    }
    return dataStr;
}

function formatarDataBR(ano, mes, dia) {
    const d = dia.toString().padStart(2, '0');
    const m = (mes + 1).toString().padStart(2, '0');
    return `${d}/${m}/${ano}`;
}

// Inicia as abas de meses
function renderizarAbas() {
    monthsTabs.innerHTML = '';
    mesesNomes.forEach((nome, index) => {
        const btn = document.createElement('button');
        btn.className = `month-tab ${index === mesAtual ? 'active' : ''}`;
        btn.textContent = nome;
        btn.onclick = () => {
            mesAtual = index;
            renderizarCalendario();
        };
        monthsTabs.appendChild(btn);
    });
}

function renderizarCalendario() {
    // Atualiza Abas visualmente
    Array.from(monthsTabs.children).forEach((btn, index) => {
        btn.className = `month-tab ${index === mesAtual ? 'active' : ''}`;
    });

    // Atualiza Titulo
    mesAnoTitulo.textContent = `${mesesNomes[mesAtual]} de ${anoAtual}`;

    calendarDays.innerHTML = '';

    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1).getDay();
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    // Células vazias antes do dia 1 (Domingo = 0)
    for (let i = 0; i < primeiroDiaMes; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'cal-day-cell empty';
        calendarDays.appendChild(emptyCell);
    }

    const hoje = new Date();

    // Dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const cell = document.createElement('div');
        cell.className = 'cal-day-cell';
        cell.textContent = dia;

        if (dia === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear()) {
            cell.classList.add('today');
        }

        cell.onclick = () => {
            // Remove active das outras células
            document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('d-active'));
            cell.classList.add('d-active');

            buscarRegistrosDia(anoAtual, mesAtual, dia);
        };

        calendarDays.appendChild(cell);
    }
}

async function buscarRegistrosDia(ano, mes, dia) {
    const dataFormatada = `${ano}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    const dataBR = formatarDataBR(ano, mes, dia);

    detalhesTitulo.textContent = `Detalhes do dia: ${dataBR}`;
    tbodyDetalhes.innerHTML = '<tr><td colspan="4" class="text-center" style="padding: 2rem;">Carregando...</td></tr>';

    try {
        const res = await fetch(`api/calendario.php?data=${dataFormatada}`);
        const json = await res.json();

        if (json.registros && json.registros.length > 0) {
            tbodyDetalhes.innerHTML = '';
            json.registros.forEach(r => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${r.nome}</strong></td>
                    <td>${formatarHora(r.hora_saida)}</td>
                    <td>${r.hora_retorno ? formatarHora(r.hora_retorno) : 'Em aberto'}</td>
                    <td>${r.duracao_minutos !== null ? r.duracao_minutos + ' min' : '-'}</td>
                `;
                tbodyDetalhes.appendChild(tr);
            });
        } else {
            tbodyDetalhes.innerHTML = `<tr><td colspan="4" class="empty-state text-center" style="padding: 2rem;">Nenhum registro encontrado para esta data.</td></tr>`;
        }
    } catch (error) {
        tbodyDetalhes.innerHTML = `<tr><td colspan="4" class="empty-state text-center" style="padding: 2rem; color:red;">Erro ao buscar dados.</td></tr>`;
    }
}

// Botões de passar ano
document.getElementById('btnPrevYear').addEventListener('click', () => {
    anoAtual--;
    renderizarCalendario();
});

document.getElementById('btnNextYear').addEventListener('click', () => {
    anoAtual++;
    renderizarCalendario();
});

document.addEventListener('DOMContentLoaded', () => {
    renderizarAbas();
    renderizarCalendario();
});
