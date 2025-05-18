export const CSS_MOBILE = `
/* Tabela de classificação */
.table-classification--expansive {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 3rem; /* Aumentado o margin-bottom */
    background-color: white;
    /* box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1); */ /* Ajustado a sombra */
    border-radius: 0.8rem; /* Mantido o border-radius */
    overflow: hidden;
}

.table-classification--expansive__header {
    background-color: #2c3e50;
    color: white;
}

.table-classification--expansive__header th {
    padding: 1rem 0.8rem; /* Aumentado o padding */
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1.3rem; /* Aumentado o font-size */
}

.table-classification--expansive__header th:first-child {
    text-align: left;
    padding-left: 1.5rem; /* Aumentado o padding-left */
}

.table-classification--expansive__header th.-wide_col {
    min-width: 3rem; /* Mantido o min-width */
}

.table-classification--expansive__body tr {
    border-bottom: 1px solid #e0e0e0;
}

.table-classification--expansive__body tr:last-child {
    border-bottom: none;
}

/* .table-classification--expansive__body tr:hover {
    background-color: #f9f9f9;
} */

.table-classification--expansive__body td {
    padding: 1rem 0.8rem; /* Aumentado o padding */
    text-align: center;
    vertical-align: middle;
    font-size: 1.6rem; /* Aumentado o font-size */
}

.table-classification--expansive__body td:first-child {
    text-align: left;
    padding-left: 1.5rem; /* Aumentado o padding-left */
}

.table-classification--expansive__body td:nth-child(2) {
    text-align: left;
    font-weight: 500;
}

/* Cores para as linhas */
.table-classification--expansive__body tr.-is-green {
    background-color: rgba(46, 204, 113, 0.1);
}

.table-classification--expansive__body tr.-is-red {
    background-color: rgba(231, 76, 60, 0.1);
}

/* Ícones e imagens dos times */
.table-classification--expansive__icon {
    display: inline-flex;
    align-items: center;
    margin-right: 0.8rem; /* Mantido o margin-right */
    vertical-align: middle;
}

.table-classification--expansive__icon img {
    width: 2.4rem; /* Mantido o width */
    height: 2.4rem; /* Mantido o height */
    object-fit: contain;
}

/* Ranking */
.table-classification--expansive__ranking {
    font-weight: bold;
    display: inline-block;
    min-width: 3rem; /* Mantido o min-width */
    font-size: 1.4rem; /* Aumentado o font-size */
}

/* Últimos jogos */
.table-classification--expansive__last-matches {
    display: inline-block;
    width: 1.6rem; /* Mantido o width */
    height: 1.6rem; /* Mantido o height */
    border-radius: 50%;
    margin: 0 0.2rem; /* Mantido o margin */
}

.table-classification--expansive__last-matches.victories {
    background-color: #2ecc71;
}

.table-classification--expansive__last-matches.ties {
    background-color: #f39c12;
}

.table-classification--expansive__last-matches.defeats {
    background-color: #e74c3c;
}

/* Cards de jogos */
.card-match {
    background-color: white;
    border-radius: 0.8rem; /* Mantido o border-radius */
    /* box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1); */ /* Ajustado a sombra */
    margin-bottom: 2rem; /* Aumentado o margin-bottom */
    border: 1px solid black;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    overflow: hidden;
}

.card-match__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1.5rem; /* Aumentado o padding */
    background-color: #2c3e50;
    color: white;
}

.card-match__header time {
    font-weight: 500;
    font-size: 1.4rem; /* Aumentado o font-size */
}

.card-match__bagde {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.8rem; /* Mantido o padding */
    border-radius: 0.4rem; /* Mantido o border-radius */
    font-size: 1.2rem; /* Aumentado o font-size */
    font-weight: 500;
    text-transform: uppercase;
}

/* .card-match__bagde.center {
    margin: 0 auto;
} */

.card-match__bagde.after-game {
    background-color: #3498db;
    color: white;
}

.card-match__bagde.scheduling {
    background-color: #95a5a6;
    color: white;
}

.card-match__bagde .icon {
    margin-right: 0.5rem; /* Mantido o margin-right */
    display: inline-flex;
}

.card-match__bagde .icon svg {
    width: 1.2rem; /* Mantido o width */
    height: 1.2rem; /* Mantido o height */
}

.card-match__scoreboard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem; /* Aumentado o padding */
}

.card-match__score-team {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-match__score-team.home {
    align-items: flex-end;
}

.card-match__score-team.away {
    align-items: flex-start;
}

.card-team-name {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-match__score-team-img {
    width: 5rem; /* Mantido o width */
    height: 5rem; /* Mantido o height */
    object-fit: contain;
    margin-bottom: 0.8rem; /* Mantido o margin-bottom */
}

.card-match__short-name {
    font-weight: 600;
    text-align: center;
    font-size: 1.4rem; /* Aumentado o font-size */
}

.card-match__score-result {
    flex: 0 0 12rem; /* Mantido o flex-basis */
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-match__score-number {
    font-size: 2.4rem; /* Mantido o font-size */
    font-weight: 700;
    min-width: 3rem; /* Mantido o min-width */
    text-align: center;
}

.card-match__score-result .icon {
    margin: 0 1rem; /* Mantido o margin */
}

.card-match__score-result .icon svg {
    width: 2.4rem; /* Mantido o width */
    height: 2.4rem; /* Mantido o height */
}

/* Responsividade para telas menores */
@media (max-width: 600px) {
    .table-classification--expansive__header th,
    .table-classification--expansive__body td {
        padding: 0.8rem 0.4rem; /* Reduzido o padding */
        font-size: 1rem; /* Reduzido o font-size */
    }

    .table-classification--expansive__icon img {
        width: 2rem; /* Reduzido o width */
        height: 2rem; /* Reduzido o height */
    }

    .card-match__scoreboard {
        padding: 1.5rem; /* Reduzido o padding */
        /* flex-direction: column; */
        gap: 1rem; /* Aumentado o gap */
    }

    .card-match__score-team-img {
        width: 4rem; /* Reduzido o width */
        height: 4rem; /* Reduzido o height */
    }

    .card-match__score-number {
        font-size: 2rem; /* Reduzido o font-size */
    }
}

/* RESPONSIVIDADE PARA TABELA */
@media (max-width: 768px) {
    .table-classification--expansive-wrapper {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .table-classification--expansive {
        width: 768px; /* Largura mínima para manter a estrutura */
    }
}

/* RESPONSIVIDADE PARA O CARD DO JOGO */
@media (max-width: 480px) {
    .card-match__scoreboard {
        /* flex-direction: column; */
        gap: 0.5rem; /* Reduzido o gap */
    }

    .card-match__score-team.home,
    .card-match__score-team.away {
        align-items: center;
    }

    .card-match__score-number {
        font-size: 1.8rem; /* Reduzido o font-size */
    }
}
`;

export const JS = `
let links = document.querySelectorAll('a')

links.forEach(link => {
    if (link.href.includes('futebolinterior')) {
        link.parentNode.removeChild(link);
    }
});`;
