# GoEats — A História do Projeto

## O Começo

Tudo começou com uma pergunta simples: qual biblioteca usar para calcular o tempo estimado de entrega de um entregador? A resposta foi a Google Maps Distance Matrix API. Mas essa pergunta abriu uma conversa muito maior.

A ideia de construir um app de delivery do zero, completo — com lado do usuário, da loja e do entregador — tomou forma. E junto com ela veio uma intenção mais ambiciosa: **aprender microsserviços com DDD para conseguir emprego em uma Fintech**.

---

## A Decisão de Arquitetura

Antes de escrever uma linha de código de backend, passamos horas discutindo arquitetura. Microserviços direto? Monólito primeiro? A decisão foi clara:

> **Monólito modular com DDD → Kafka → Microsserviços**

Não porque microsserviços são complicados demais para começar, mas porque construir um monólito bem estruturado **ensina mais** do que pular direto para a complexidade distribuída. A estratégia de extração gradual tem nome: **Strangler Fig Pattern**.

Aprendemos também por que essa ordem faz sentido na prática: empresas sérias não nascem com microsserviços. Elas chegam lá depois de entender profundamente o domínio.

---

## O Stack Escolhido

### Mobile
- **React Native + Expo** com TypeScript
- **Zustand** para estado global (carrinho, autenticação, pedidos)
- **React Navigation** com navegadores separados por contexto de auth

### API
- **NestJS** com TypeScript — escolhido sobre Express por ser mais estruturado, ter suporte nativo a microsserviços via `@nestjs/microservices`, e porque cada `@Module()` já nasce como um Bounded Context
- **Knex** como query builder — não ORM, para manter o domínio limpo e escrever SQL real
- **PostgreSQL** com schemas separados por módulo (preparação para microsserviços)
- **Kafka** virá na Fase 3

A escolha do Knex sobre Prisma foi intencional: Prisma é mais produtivo para CRUD, mas tende a vazar para o domínio. Com Knex, as entidades são TypeScript puro — sem decorators, sem dependência de biblioteca.

---

## O que foi Construído até Agora

### Mobile — Etapa 1 (em andamento)

O app começa com uma experiência fluida de exploração sem exigir login. O usuário navega livremente, adiciona itens ao carrinho e só será redirecionado para login no momento do checkout — o padrão "lazy auth" usado pelo iFood e Rappi.

**Telas construídas:**
- Splash Screen e Onboarding
- Home com listagem de restaurantes, filtros por categoria e banners promocionais
- Busca de endereço com modal
- Restaurant Menu Screen com abas (Popular, Pratos, Bebidas, Sobremesas)
- Cart Screen com resumo, taxa de entrega e total
- Search Results Screen com busca por nome de restaurante ou item do cardápio

**Navegação:**
Três navigators separados com responsabilidades distintas: `PublicNavigator` (sem login), `PrivateNavigator` (autenticado) e o fluxo de auth integrado ao stack público — ao pressionar "Pedidos" ou "Perfil" sem estar logado, o app abre a tela de login diretamente, sem bloqueios abruptos.

**Estado global com Zustand:**
- `cartStore` — carrinho persistido por restaurante. Trocar de restaurante limpa o carrinho automaticamente
- `authStore` — token JWT e dados do usuário, persistidos no AsyncStorage
- `orderStore` — pedido ativo e histórico

### API — Fase 1 (iniciada)

A API nasceu como um NestJS simples, sem DDD ainda. O objetivo desta fase é apenas ter os endpoints funcionando e o mobile consumindo dados reais em vez do `mock.ts`.

**Configurado:**
- NestJS com `@nestjs/config`, CORS e prefixo `/api`
- Knex com PostgreSQL via Docker Compose
- Migrations e seeds com os 4 restaurantes e 22 itens de cardápio do mock
- `DatabaseModule` global com injeção via token `KNEX_TOKEN`

**Endpoints disponíveis:**
- `GET /api/restaurants` — lista com filtro por categoria
- `GET /api/restaurants/:id` — detalhes do restaurante
- `GET /api/restaurants/:id/menu` — cardápio completo

---

## Conceitos Estudados no Caminho

Durante a construção, várias perguntas sobre arquitetura surgiram e foram discutidas em profundidade:

**DDD (Domain-Driven Design)**
- Entity tem identidade e encapsula regras que dependem só dos seus próprios dados
- Use Case orquestra: busca dados externos, chama métodos da entity, salva
- Repository é a ponte entre entity e banco — a interface fica no domínio, a implementação na infra
- A regra de ouro: se precisa de `await` para buscar algo, a regra pertence ao Use Case

**Kafka e consistência eventual**
- Producer com `idempotent: true` e `acks=all` garante que o evento chegou
- Outbox Pattern: salvar o evento no banco na mesma transação do dado, publicar no Kafka depois
- Relay: worker que lê a tabela `outbox` (sent=false) e publica no Kafka
- Idempotência no consumidor: tabela `processed_events` com UNIQUE em `event_id` evita processar o mesmo evento duas vezes

**Por que NestJS facilita a migração para microsserviços**
- Cada `@Module()` já é um Bounded Context isolado
- `@nestjs/microservices` suporta Kafka nativamente — troca o transporte sem reescrever a lógica
- Guards, Pipes e Interceptors são reutilizáveis entre serviços

---

## O Plano

```
Fase 1  → Monólito simples (agora)
Fase 2  → Monólito modular com DDD
Fase 3  → Kafka + Outbox Pattern + Idempotência
Fase 4  → Extração gradual para microsserviços (Strangler Fig)
```

Cada microsserviço extraído na Fase 4 será um projeto NestJS independente com seu próprio banco, seu próprio deploy e comunicação exclusivamente via Kafka.

---

*Última atualização: Março de 2026 — API Fase 1 iniciada, Mobile Etapa 1 em andamento*
