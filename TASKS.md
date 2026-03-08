# GoEats — Tasks

## Estado atual

| Tela / Funcionalidade                  | Status                     |
| -------------------------------------- | -------------------------- |
| Splash Screen                          | Feito                      |
| Onboarding Screen                      | Feito                      |
| Home Screen (listagem de restaurantes) | Feito                      |
| Filtro de categorias                   | Feito                      |
| Banner carousel                        | Feito                      |
| Address Search Modal                   | Feito                      |
| Restaurant Menu Screen                 | Feito                      |
| Cart (add/remove itens, total)         | Feito — sem persistência   |
| Bottom Tab Bar (UI)                    | Feito — sem navegação real |
| Navegação Stack: Home → Menu           | Feito                      |

---

## Etapa 1 — Exploração sem login (front + back)

> Usuário navega, vê restaurantes e monta o carrinho sem precisar de conta.

### Mobile

- [x] Instalar e configurar **Zustand**
- [x] Store: `cartStore` — carrinho persistido por restaurante
- [x] Refatorar `AppNavigator`: `PublicNavigator` + `PrivateNavigator` + `AuthNavigator`
- [x] Conectar Bottom Tabs reais: Explorar, Pedidos, Ofertas, Perfil
- [x] Tela `CartScreen` — itens, quantidades, subtotal, taxa, total
- [x] Conectar `CartBar` ao `CartScreen`
- [x] Conectar `SearchBar` à tela `SearchResultsScreen`
- [x] Listagem de resultados com estado vazio

### API

- [x] Criar projeto **NestJS** + TypeScript em `api/`
- [x] Configurar Knex + PostgreSQL + migrations + seeds
- [x] `GET /restaurants` — listar com filtro por categoria
- [x] `GET /restaurants/:id` — detalhes
- [x] `GET /restaurants/:id/menu` — cardápio completo

### Integração

- [x] Configurar `axios` no mobile
- [x] Substituir `mock.ts` por chamadas reais à API
- [x] Tratar estados de loading e erro

---

## Etapa 2 — Checkout e autenticação (front + back)

> Usuário vai finalizar o pedido, é redirecionado para login/cadastro e volta para o checkout.

### Mobile

- [ ] Store: `authStore` — token JWT, dados do usuário
- [ ] Ao ir para checkout sem login: redirecionar para `AuthNavigator`
- [ ] Tela de Login (email + senha)
- [ ] Tela de Cadastro (nome, email, senha, telefone)
- [ ] Após login: retornar automaticamente para o checkout
- [ ] Persistir sessão com AsyncStorage
- [ ] Tela `CheckoutScreen` — resumo, endereço, forma de pagamento
- [ ] Seleção de endereço salvo ou novo
- [ ] Tela `PaymentScreen` — cartão, Pix, dinheiro
- [ ] Cupom de desconto (campo + validação)
- [ ] Tela `OrderConfirmationScreen` — animação de sucesso, número do pedido, ETA

### API

- [ ] `POST /auth/register` — cadastro
- [ ] `POST /auth/login` — retorna JWT
- [ ] `POST /auth/refresh` — renovar token
- [ ] Guard de autenticação JWT (`@nestjs/passport` + `passport-jwt`)
- [ ] Hash de senha com `bcrypt`
- [ ] `POST /orders` — criar pedido (rota privada)
- [ ] `GET /users/me/addresses` — listar endereços
- [ ] `POST /users/me/addresses` — adicionar endereço
- [ ] `DELETE /users/me/addresses/:id` — remover endereço

### Integração

- [ ] Interceptor axios — anexar JWT em todas as requisições privadas
- [ ] Tratar expiração de sessão (401 → redirecionar para login)

---

## Etapa 3 — Rastreamento de entrega (front + back)

> Pedido foi feito, usuário acompanha em tempo real.

### Mobile

- [ ] Store: `orderStore` — pedido ativo e histórico
- [ ] Tela `OrderTrackingScreen` com mapa (react-native-maps)
- [ ] Linha do tempo: Confirmado → Em preparo → Saiu para entrega → Entregue
- [ ] Posição do entregador em tempo real no mapa
- [ ] ETA dinâmico
- [ ] Botão para contatar o entregador

### API

- [ ] `GET /orders/:id` — detalhes e status atual do pedido
- [ ] WebSocket — emitir atualização de status do pedido em tempo real
- [ ] WebSocket — emitir posição do entregador em tempo real
- [ ] Integração com Google Maps Distance Matrix API para ETA

---

## Etapa 4 — Histórico, perfil e ofertas (front + back)

### Mobile

- [ ] Tela `OrdersListScreen` — pedidos passados e ativo
- [ ] Tela `OrderDetailScreen` — detalhes de um pedido
- [ ] Ação de repetir pedido
- [ ] Modal de avaliação após entrega (restaurante + entregador)
- [ ] Tela `ProfileScreen` — foto, nome, email, telefone
- [ ] Tela `EditProfileScreen`
- [ ] Tela `PaymentMethodsScreen` — cartões salvos, Pix
- [ ] Favoritos — salvar restaurante, seção no perfil
- [ ] Tela `OffersScreen` — cupons, promoções
- [ ] Tela de recuperação de senha

### API

- [ ] `GET /orders` — listar pedidos do usuário
- [ ] `POST /orders/:id/reorder` — repetir pedido
- [ ] `PATCH /orders/:id/cancel` — cancelar pedido
- [ ] `POST /orders/:id/review` — avaliar pedido
- [ ] `GET /users/me` — perfil
- [ ] `PATCH /users/me` — atualizar perfil
- [ ] `GET /users/me/favorites` — restaurantes favoritos
- [ ] `POST /users/me/favorites/:restaurantId`
- [ ] `DELETE /users/me/favorites/:restaurantId`
- [ ] `GET /offers` — cupons e promoções disponíveis

---

## Etapa 5 — App da Loja (front + back)

> Portal do restaurante para gerenciar pedidos e cardápio.

### Mobile (app separado ou modo lojista)

- [ ] Login com credenciais de lojista
- [ ] Dashboard — pedidos do dia, faturamento, avaliação média
- [ ] Toggle aberto/fechado
- [ ] Tela de pedidos em tempo real (notificação sonora)
- [ ] Aceitar ou rejeitar pedido com motivo
- [ ] Atualizar status: Em preparo → Pronto para retirada
- [ ] Editar tempo estimado de preparo por pedido
- [ ] Listagem e gerenciamento do cardápio
- [ ] Adicionar / editar / remover item
- [ ] Ativar/desativar item (esgotado)
- [ ] Configurações: horários, raio de entrega, taxa, tempo padrão de preparo
- [ ] Histórico de pedidos + relatório simples
- [ ] Avaliações recebidas

### API

- [ ] `POST /auth/restaurant/login`
- [ ] `GET /restaurant/orders` — pedidos em tempo real (WebSocket)
- [ ] `PATCH /restaurant/orders/:id/accept`
- [ ] `PATCH /restaurant/orders/:id/reject`
- [ ] `PATCH /restaurant/orders/:id/status`
- [ ] CRUD de itens do cardápio
- [ ] `PATCH /restaurant/settings` — configurações da loja

---

## Etapa 6 — App do Entregador (front + back)

> App do entregador para receber e executar corridas.

### Mobile (app separado ou modo entregador)

- [ ] Login com CPF e senha
- [ ] Cadastro com dados pessoais, veículo e documentos
- [ ] Toggle disponível/indisponível
- [ ] Tela de corrida disponível — restaurante, distância, valor, timer para aceitar
- [ ] Aceitar ou recusar corrida
- [ ] Mapa com rota até o restaurante
- [ ] Tela de entrega ativa — mapa, rota em tempo real
- [ ] Confirmar retirada no restaurante
- [ ] Confirmar entrega (código ou foto)
- [ ] Contato com o cliente
- [ ] Navegar com Google Maps / Waze
- [ ] Histórico de entregas
- [ ] Tela de ganhos: diário, semanal, mensal
- [ ] Perfil — dados pessoais, veículo, avaliações, documentos

### API

- [ ] `POST /auth/driver/login` e `/register`
- [ ] `PATCH /drivers/me/availability` — online/offline
- [ ] WebSocket — receber corrida disponível
- [ ] `POST /deliveries/:id/accept`
- [ ] `POST /deliveries/:id/pickup` — confirmar retirada
- [ ] `POST /deliveries/:id/complete` — confirmar entrega
- [ ] `GET /drivers/me/earnings` — ganhos por período

---

## 5. API — Fase 1: Monólito Simples (MVP)

> Objetivo: ter uma API funcionando conectada ao mobile. NestJS com módulos simples, sem DDD ainda. Foco em entregar produto.

### 5.1 Setup inicial

- [ ] Criar projeto **NestJS** + TypeScript em `api/` (`nest new api`)
- [ ] Configurar `tsconfig.json`, `eslint`, `prettier`
- [ ] Configurar banco PostgreSQL com Knex
- [ ] Criar schema único `public` com todas as tabelas
- [ ] Configurar variáveis de ambiente com `@nestjs/config`
- [ ] Criar script de migrations e seeds iniciais

### 5.2 Autenticação

- [ ] `POST /auth/register` — cadastro de usuário
- [ ] `POST /auth/login` — login, retorna JWT
- [ ] `POST /auth/refresh` — renovar token
- [ ] Guard de autenticação JWT (`@nestjs/passport` + `passport-jwt`)
- [ ] Hash de senha com `bcrypt`

### 5.3 Restaurantes

- [ ] `GET /restaurants` — listar com filtro por categoria e endereço
- [ ] `GET /restaurants/:id` — detalhes do restaurante
- [ ] `GET /restaurants/:id/menu` — cardápio completo

### 5.4 Pedidos

- [ ] `POST /orders` — criar pedido
- [ ] `GET /orders` — listar pedidos do usuário autenticado
- [ ] `GET /orders/:id` — detalhes do pedido
- [ ] `PATCH /orders/:id/cancel` — cancelar pedido

### 5.5 Perfil do usuário

- [ ] `GET /users/me` — dados do usuário autenticado
- [ ] `PATCH /users/me` — atualizar perfil
- [ ] `GET /users/me/addresses` — listar endereços
- [ ] `POST /users/me/addresses` — adicionar endereço
- [ ] `DELETE /users/me/addresses/:id` — remover endereço

### 5.6 Integração com mobile

- [x] Substituir `mock.ts` por chamadas reais à API
- [ ] Configurar `axios` com interceptor de token JWT
- [ ] Tratar erros de rede e expiração de sessão

---

## 6. API — Fase 2: Monólito Modular com DDD

> Objetivo: refatorar para estrutura modular com DDD dentro do NestJS. Cada NestJS Module vira um Bounded Context. Preparar para extração futura em microsserviços.

### 6.1 Reestruturação de pastas

- [ ] Reorganizar em NestJS Modules: `AuthModule`, `OrderingModule`, `RestaurantModule`, `DeliveryModule`, `PaymentsModule`
- [ ] Cada módulo com camadas: `domain/`, `application/`, `infra/`
- [ ] Criar schemas separados no banco por módulo (`auth.*`, `ordering.*`, etc.)
- [ ] Cada módulo com sua própria instância Knex apontando para seu schema
- [ ] Cada módulo com suas próprias migrations e seeds

### 6.2 Domínio — entities e regras de negócio

- [ ] `Order` entity — com regras: cancelamento, status, itens, desconto
- [ ] `Restaurant` entity — com regras: aberto/fechado, cardápio, raio de entrega
- [ ] `User` entity — com regras: endereços, métodos de pagamento
- [ ] `Delivery` entity — com regras: aceitar corrida, confirmar retirada, confirmar entrega
- [ ] `Coupon` entity — com regras: validade, uso único, valor mínimo
- [ ] Value objects: `Money`, `Address`, `OrderStatus`, `DeliveryStatus`

### 6.3 Casos de uso

- [ ] `PlaceOrderUseCase` — valida restaurante aberto, cria pedido, aplica cupom
- [ ] `CancelOrderUseCase` — valida regras de cancelamento
- [ ] `ConfirmOrderUseCase` — restaurante confirma pedido
- [ ] `AssignDeliveryUseCase` — atribui entregador ao pedido
- [ ] `ConfirmDeliveryUseCase` — entregador confirma entrega

### 6.4 Repositórios

- [ ] Interface do repositório no domínio (sem Knex)
- [ ] Implementação com Knex no infra de cada módulo
- [ ] Mapeamento manual entre row do banco e entity do domínio

### 6.5 Comunicação entre módulos

- [ ] Definir eventos de domínio: `OrderPlaced`, `OrderConfirmed`, `DeliveryCompleted`, `PaymentApproved`
- [ ] Implementar event bus in-memory para comunicação entre módulos
- [ ] Módulos reagem a eventos sem chamar uns aos outros diretamente

### 6.6 Testes

- [ ] Testes unitários das entities (sem banco, sem HTTP)
- [ ] Testes dos casos de uso com repositórios em memória
- [ ] Testes de integração dos endpoints principais

---

## 7. API — Fase 3: Mensageria e Preparação para Microsserviços

> Objetivo: trocar event bus in-memory por Kafka. Adicionar outbox pattern e idempotência.

### 7.1 Infraestrutura

- [ ] Subir Kafka com Docker Compose
- [ ] Configurar `kafkajs` no projeto
- [ ] Criar tópicos por evento de domínio

### 7.2 Outbox Pattern

- [ ] Criar tabela `outbox` em cada módulo produtor
- [ ] Salvar evento no outbox na mesma transação do dado
- [ ] Implementar relay por módulo — lê outbox e publica no Kafka
- [ ] Marcar `sent=true` após ack do Kafka
- [ ] Configurar producer com `idempotent: true` e `acks=all`

### 7.3 Idempotência nos consumidores

- [ ] Criar tabela `processed_events` em cada módulo consumidor
- [ ] Unique constraint em `event_id`
- [ ] Verificar duplicata antes de processar
- [ ] Commitar offset do Kafka só após transação finalizar

### 7.4 Observabilidade

- [ ] Logs estruturados com `@nestjs/common` Logger ou `pino` via `nestjs-pino`
- [ ] Rastrear eventos perdidos ou não processados
- [ ] Health check dos consumers e relay

---

## 8. API — Fase 4: Extração de Microsserviços

> Objetivo: extrair módulos como serviços independentes. Um de cada vez, sem parar o monólito.

### 8.1 Estratégia de extração (Strangler Fig)

- [ ] Definir ordem de extração: `payments` → `delivery` → `ordering` → `restaurant` → `auth`
- [ ] Cada extração segue o mesmo processo:
  - mover pasta do módulo para repositório próprio
  - apontar `DATABASE_URL` para banco próprio
  - trocar event bus in-memory por Kafka (já feito na fase 3)
  - ajustar rotas no API Gateway

### 8.2 API Gateway

- [ ] Configurar API Gateway (nginx ou serviço dedicado)
- [ ] Rotear requisições para o serviço correto por prefixo de rota
- [ ] Centralizar autenticação JWT no gateway

### 8.3 Payments Service

- [ ] Extrair módulo `payments` como serviço independente
- [ ] Banco próprio: `payments_db`
- [ ] Comunicação com outros serviços exclusivamente via Kafka
- [ ] Cópia local de dados necessários de outros domínios (user snapshot)

### 8.4 Delivery Service

- [ ] Extrair módulo `delivery` como serviço independente
- [ ] Banco próprio: `delivery_db`
- [ ] WebSocket para posição em tempo real do entregador
- [ ] Integração com Google Maps Distance Matrix API para ETA

### 8.5 Demais serviços

- [ ] Extrair `ordering`, `restaurant`, `auth` seguindo o mesmo padrão
- [ ] Cada serviço com seu próprio relay e consumers Kafka
- [ ] Docker Compose com todos os serviços orquestrados

---

## 9. Melhorias técnicas transversais

- [ ] Substituir `useFonts` locais por um provider global em `App.tsx`
- [ ] Adicionar **React Query** (ou SWR) para cache e sincronização de dados da API
- [ ] Configurar **push notifications** (Expo Notifications) — pedidos, status, promoções
- [ ] Adicionar tratamento global de erros (error boundary, toast de falha de rede)
- [ ] Implementar deep linking para notificações abrirem a tela correta
- [ ] Testes de componentes críticos (CartBar, CheckoutScreen)
- [ ] Preparar build EAS (Expo Application Services) para iOS e Android
