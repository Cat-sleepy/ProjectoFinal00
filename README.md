# CareGrid – Gestão de Escalas de Internos

Aplicação web desenvolvida em Angular para gestão da distribuição de internos na especialidade de Medicina Interna de um hospital.

A aplicação permite gerir internos, criar escalas de trabalho e visualizar indicadores do sistema através de relatórios.

---

## Funcionalidades principais

### Gestão de Internos
- Listagem de internos
- Criação, edição e eliminação de internos
- Indicação do ano de internato
- Estado do interno (ativo, indisponível, sem atribuição)
- Pesquisa por nome
- Ordenação por nome ou ano de internato

### Gestão de Escalas
- Criação de atribuições de escala
- Associação de internos a cada atribuição
- Validações de regras de negócio:
  - Urgência Dia → 3 internos do 1.º ano
  - Urgência Noite → 1 interno do 1.º ano + 1 de outro ano
  - Residência Noite → não permite internos do 1.º ano
  - Um interno não pode estar em mais do que uma atribuição no mesmo dia
  - Não podem existir duas atribuições iguais no mesmo dia

### Dashboard
Visualização geral da distribuição mensal de escalas.

### Relatórios
Apresentação de indicadores (KPIs) do sistema, como:
- Total de internos
- Internos indisponíveis
- Total de escalas criadas
- Escalas do mês atual

---

## Tecnologias utilizadas

- Angular
- TypeScript
- HTML
- CSS
- RxJS
- LocalStorage (persistência de dados simulada)

---


---

## Instalação e execução

1. Clonar o repositório
  git clone https://github.com/cat-sleepy/ProjectoFinal00

2. Instalar dependências
  npm install

3. Executar a aplicação
   ng serve

4. Abrir no browser
   http://localhost:4200

---
## Autora
Catarina Ferreira

