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

*Última atualização: Março de 2026 — Autenticação, endereços e checkout integrados*

---

## A Migração para Prisma e os Primeiros Dados Reais — Março 2026

Com o mobile consumindo a API real, chegou a hora de evoluir o backend. O Knex foi trocado pelo Prisma ORM — uma decisão pragmática para este momento do projeto. O Prisma acelera o desenvolvimento com tipagem automática gerada a partir do schema, migrations declarativas e um client gerado que elimina os falsos positivos do ESLint que o Knex gerava. O domínio ainda é mantido limpo: o Prisma vive na camada de infraestrutura, injetado via `PrismaService`.

### Endereços Salvos: o Primeiro Bounded Context com Autenticação

A primeira feature real com banco foi o módulo de endereços. A decisão arquitetural mais importante aqui foi sobre **como salvar o endereço no pedido**: não por FK, mas como snapshot — uma cópia dos dados no momento do pedido. Isso garante que edições futuras no endereço não alterem o histórico de pedidos.

O modelo ficou assim:

- `addresses` — tabela separada com relação N:1 com `users`
- Primeiro endereço cadastrado vira default automaticamente
- Troca de default é atômica: desativa todos, ativa o novo

Para proteger as rotas foi criado o `JwtGuard` — um guard reutilizável que valida o Bearer token e injeta o `user` no request. Qualquer módulo que precisar de autenticação usa `@UseGuards(JwtGuard)`.

No mobile, o CheckoutScreen ganhou um modal de endereços com duas faces: lista de endereços salvos (com seleção) e formulário de cadastro de novo endereço. O primeiro endereço cadastrado já vira o selecionado automaticamente.

### Aprendizados de Infraestrutura

Durante a configuração do banco surgiram dúvidas que revelaram conceitos importantes sobre Docker:

- O PostgreSQL dentro de cada container sempre escuta na porta `5432` — isso é o padrão interno
- O conflito acontece na porta **externa** (do computador), onde dois containers não podem dividir a mesma porta
- A notação `5433:5432` significa: porta `5433` do host mapeia para porta `5432` do container
- Alternativa sem Docker: um único PostgreSQL local com múltiplos bancos (`goeats`, `evoluna`, etc.) — mais simples para desenvolvimento

### Segurança: Tokens Inválidos

Foi implementado um interceptor no axios do mobile que detecta respostas `401` e chama `clearAuth()` automaticamente — evitando que o usuário fique preso em um estado autenticado com token expirado ou inválido sem perceber.

### Como Salvar Cartão com Segurança

Uma discussão importante antes de implementar pagamentos: **nunca salvar dados de cartão diretamente**. O fluxo correto é tokenização via gateway (Stripe, MercadoPago) — o app envia o cartão direto para o gateway, recebe um token opaco, e só esse token fica no banco junto com os últimos 4 dígitos e a bandeira (apenas para exibição). PIX e dinheiro não precisam de token.

### Como Funcionam Cupons

O sistema de cupons foi debatido antes de ser implementado. A estrutura: tabela `coupons` com tipo (`percentage`, `fixed`, `free_delivery`), valor, pedido mínimo, limite de uso e validade. Uma tabela `coupon_usages` evita uso duplo por usuário. A validação no backend verifica todas as condições em sequência antes de aplicar o desconto.

---

## Refatoração das Migrations e IDs Inteiros — Março 2026

### A Troca de UUID para Int autoincrement

Os IDs do sistema foram migrados de `String @id @default(uuid())` para `Int @id @default(autoincrement())`. A motivação principal foi legibilidade no banco de dados durante o desenvolvimento — UUIDs poluem o DBeaver e dificultam inspeções rápidas. O tradeoff de segurança foi discutido: IDs sequenciais expõem o volume de dados (ex: `/orders/4` revela que há poucos pedidos), mas para um portfólio isso não é um problema real. Em produção, a solução é usar IDs opacos (UUIDs ou NanoIDs) nas rotas públicas enquanto os PKs internos continuam como inteiros.

### O Problema das Migrations Antigas

A mudança de tipos de ID criou um impasse clássico: as migrations existentes tinham `id TEXT NOT NULL` (do tempo de UUID), mas o `schema.prisma` já estava com `Int @id @default(autoincrement())`. O Prisma não consegue alterar o tipo de coluna quando há dados — e quando não há dados, tentou aplicar as migrations antigas (TEXT), fazendo o Prisma client (gerado do schema novo com Int) falhar no seed com `P2011: Null constraint violation on id`.

A solução foi deletar as migrations antigas e criar uma migration inicial do zero, com `SERIAL` em todos os IDs. O `db:reset --force` agora dropa, remigra e re-popula em um único comando.

### Fix: navigation.goBack() durante o render

Um bug sutil foi corrigido no `CheckoutScreen`: o código chamava `navigation.goBack()` diretamente no corpo do componente (fora de qualquer handler ou effect), o que é proibido no React — navegação não pode acontecer durante a renderização. O fix foi mover para um `useEffect`, garantindo que a navegação só ocorre após a montagem do componente.
