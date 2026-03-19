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
- Supabase (gestão de base de dados e autenticação de utilizadores)

---

## Instalação e execução

1. Clonar o repositório
   ```bash
   git clone https://github.com/cat-sleepy/ProjectoFinal00
   ```

2. Instalar dependências
   ```bash
   npm install
   ```

3. Executar a aplicação
   ```bash
   ng serve
   ```

4. Abrir no browser
   ```
   http://localhost:4200
   ```

---

## Abrir no Vercel

O projeto pode ser aberto diretamente no **Vercel** a partir dos containers disponíveis, sem necessidade de instalação local.

1. Aceder ao Vercel e selecionar a opção de abrir a partir de um container
2. Escolher o container correspondente ao projeto CareGrid
3. O ambiente de desenvolvimento ficará disponível automaticamente com todas as dependências configuradas

---

## Abrir via Docker

O projeto suporta execução através de **Docker**, permitindo levantar o ambiente a partir dos containers definidos.

1. Garantir que o Docker está instalado e em execução
2. Na raiz do projeto, iniciar os containers:
   ```bash
   docker compose up
   ```
3. Aceder à aplicação no browser em:
   ```
   http://localhost:4200
   ```

---

## Proteção da branch `main`

A branch `main` está protegida e não permite commits diretos.

Todo o desenvolvimento deve ser feito em branches separadas, seguindo o fluxo:

1. Criar uma nova branch a partir de `main`
   ```bash
   git checkout -b feature/nome-da-funcionalidade
   ```
2. Desenvolver e fazer commit das alterações na nova branch
3. Abrir um **Pull Request** para `main`
4. O merge só é efetuado após revisão e aprovação

---

## Autora
Catarina Ferreira
