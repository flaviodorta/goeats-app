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
- Knex — query builder (não ORM), mantém domínio limpo
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
- `DatabaseModule` é `@Global()` — injeta Knex via token `KNEX_TOKEN`
- Injeção: `@Inject(KNEX_TOKEN) private readonly db: Knex`

### Knex
- Usar generics nas queries: `this.db<MyRow>('table').select('*')`
- `.returning<{ id: string }[]>('id')` para seeds/inserts com tipo correto
- ESLint: `no-unsafe-assignment`, `no-unsafe-member-access`, `no-unsafe-return`, `no-unsafe-call` estão **desativados** (falsos positivos do Knex — não é bug)

### Banco de Dados
- PostgreSQL com schemas separados por módulo (preparação para microsserviços)
- Migrations em `api/src/database/migrations/`
- Seeds em `api/src/database/seeds/`

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

## Comandos Úteis

```bash
# API
cd api
npm run start:dev          # dev server
npx knex migrate:latest    # rodar migrations
npx knex seed:run          # rodar seeds

# Mobile
cd mobile
npx expo start
```
