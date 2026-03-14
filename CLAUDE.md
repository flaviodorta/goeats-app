# GoEats — CLAUDE.md

Projeto de delivery app completo (usuário, loja, entregador). Objetivo de aprendizado: microsserviços com DDD para portfólio Fintech.

## Estrutura do Repositório

```
/
├── mobile/        — React Native + Expo (TypeScript)
├── api/           — NestJS (TypeScript)
├── web/           — (futuro)
├── STORY.md       — história narrativa do projeto
└── CLAUDE.md      — este arquivo
```

---

## Stack

### Mobile (`/mobile/`)
- React Native + Expo (TypeScript, template `blank-typescript`)
- Zustand — estado global (cart, auth, orders)
- React Navigation — navegação com navigators separados por contexto
- Entry: `mobile/App.tsx`

### API (`/api/`)
- NestJS com TypeScript
- Prisma ORM — schema em `api/prisma/schema.prisma`, client via `PrismaService`
- PostgreSQL 16 via Docker Compose
- Porta: 3333, prefixo global: `/api`

---

## Estratégia de Arquitetura

**Evolução gradual:**
```
Fase 1 → Monólito simples (atual)
Fase 2 → Monólito modular com DDD
Fase 3 → Kafka + Outbox Pattern + Idempotência
Fase 4 → Extração para microsserviços (Strangler Fig Pattern)
```

Cada `@Module()` do NestJS já nasce como Bounded Context — facilita extração futura.

---

## Convenções da API

### Módulos NestJS
- Cada módulo = um Bounded Context
- `PrismaModule` é `@Global()` — exporta `PrismaService` para todos os módulos
- Injeção: `constructor(private readonly prisma: PrismaService)`

### Prisma
- Schema em `api/prisma/schema.prisma`
- Migrations: `npx prisma migrate dev --name <nome>`
- Client gerado automaticamente após migrate
- Seeds em `api/prisma/seed.ts` — rodar com `npm run seed`

### Banco de Dados
- PostgreSQL 16
- Migrations gerenciadas pelo Prisma em `api/prisma/migrations/`

### Endpoints atuais
- `GET /api/restaurants` — lista com filtro `?category=`
- `GET /api/restaurants/:id` — detalhes
- `GET /api/restaurants/:id/menu` — cardápio

---

## Convenções do Mobile

### Navegação
- **PublicNavigator** — Stack com Tab (Explore + Ofertas) + telas: RestaurantMenu, Cart, SearchResults, Login, Register
- **PrivateNavigator** — Stack com Tab (todas as 4 abas) + RestaurantMenu
- **AppNavigator** — lê `authStore`, renderiza Public ou Private
- Lazy auth: usuário navega sem login; ao clicar em Pedidos/Perfil sem estar logado → abre Login diretamente no stack público

### Types de Navegação (`mobile/src/navigation/types.ts`)
- `PublicStackParamList` — params do stack público
- `PrivateStackParamList` — params do stack privado
- `PublicStackNavigation` / `PrivateStackNavigation` — tipos de prop navigation

### Stores Zustand (`mobile/src/stores/`)
- `cartStore` — carrinho por restaurante; trocar restaurante limpa automaticamente
- `authStore` — token JWT + dados do usuário, persistidos no AsyncStorage
- `orderStore` — pedido ativo + histórico

### Paleta de Cores (`mobile/constants/colors.ts`)
- Primary: `#E53935` (vermelho — botões/CTAs)
- PrimaryDark: `#B71C1C` (headers, pressed)
- Accent: `#FF6F61` (badges, promos)
- Background: `#FFF5F5` (branco quente)
- Surface: `#FFFFFF`

---

## DDD — Conceitos para Fase 2

- **Entity** — tem identidade, encapsula regras que dependem só dos próprios dados
- **Use Case** — orquestra: busca dados externos, chama métodos da entity, salva
- **Repository** — interface no domínio, implementação na infra (independente de tecnologia)
- **Regra de ouro**: se precisa de `await` para buscar algo externo, a regra pertence ao Use Case

---

## Kafka — Conceitos para Fase 3

- Producer com `idempotent: true` + `acks=all`
- **Outbox Pattern**: salvar evento no banco na mesma transação do dado, publicar no Kafka depois via Relay
- **Idempotência no consumidor**: tabela `processed_events` com UNIQUE em `event_id`

---

## Docker

```bash
cd api
docker compose up -d   # sobe PostgreSQL na porta 5432
```

Credenciais: `postgres / postgres`, banco: `goeats`

---

## Workflow com Claude

### Commit
Quando o usuário escrever **"commit"**, Claude deve:
1. Rodar `git status` + `git diff` para analisar todas as mudanças
2. Classificar o tipo: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`
3. Adicionar os arquivos relevantes (nunca `.env`, binários ou arquivos gerados)
4. Commitar com mensagem no padrão Conventional Commits: `tipo(escopo): descrição curta`
5. Atualizar o `STORY.md` com um resumo narrativo das mudanças e debates da sessão
6. Atualizar o `TASKS.md`: marcar com `[x]` as tasks concluídas e adicionar novas tasks descobertas seguindo o padrão do arquivo
7. Fazer `git add STORY.md TASKS.md` e incluir no mesmo commit ou em commit separado `docs: update story and tasks`
8. Rodar `git push` automaticamente após o commit

---

## Comandos Úteis

```bash
# API
cd api
npm run start:dev                              # dev server
npx prisma migrate dev --name <nome>           # criar e aplicar migration
npx prisma migrate deploy                      # aplicar migrations existentes
npm run seed                                   # rodar seeds

# Mobile
cd mobile
npx expo start
```
