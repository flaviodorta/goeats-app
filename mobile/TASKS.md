# GoEats Mobile — Tasks

## Estado atual

| Tela / Funcionalidade | Status |
|---|---|
| Splash Screen | Feito |
| Onboarding Screen | Feito |
| Home Screen (listagem de restaurantes) | Feito |
| Filtro de categorias | Feito |
| Banner carousel | Feito |
| Address Search Modal | Feito |
| Restaurant Menu Screen | Feito |
| Cart (add/remove itens, total) | Feito — sem persistência |
| Bottom Tab Bar (UI) | Feito — sem navegação real |
| Navegação Stack: Home → Menu | Feito |

**Pendente:** tudo abaixo. As tabs de Pedidos, Ofertas e Perfil não estão conectadas a nenhuma tela.

---

## 1. Infraestrutura

### 1.1 Gerenciamento de estado global
- [ ] Instalar e configurar **Zustand** (ou Context API)
- [ ] Store: `cartStore` — carrinho persistido por restaurante
- [ ] Store: `authStore` — usuário logado, token, perfil
- [ ] Store: `orderStore` — pedido ativo e histórico

### 1.2 Navegação
- [ ] Refatorar `AppNavigator` para suportar **Tab Navigator** (Bottom Tabs reais)
- [ ] Conectar tabs: Explorar, Pedidos, Ofertas, Perfil
- [ ] Criar `AuthNavigator` — fluxo de login/cadastro separado do app principal
- [ ] Adicionar rotas faltantes ao `RootStackParamList`:
  - `Cart`, `Checkout`, `OrderConfirmation`, `OrderTracking`
  - `Profile`, `EditProfile`, `Addresses`, `PaymentMethods`
  - `OrdersList`, `OrderDetail`
  - `SearchResults`, `Offers`

### 1.3 Autenticação
- [ ] Tela de Login (email + senha)
- [ ] Tela de Cadastro (nome, email, senha, telefone)
- [ ] Tela de recuperação de senha
- [ ] Persistir sessão com AsyncStorage
- [ ] Verificar sessão no boot (App.tsx — estado `auth` além de `onboarding`)

### 1.4 Dados / API
- [ ] Substituir `mock.ts` por chamadas reais à API
- [ ] Criar camada de serviços: `services/restaurantService.ts`, `services/orderService.ts`, etc.
- [ ] Tratar estados de loading e erro nas listagens

---

## 2. App do Cliente

### 2.1 Busca
- [ ] Conectar `SearchBar` à tela `SearchResultsScreen`
- [ ] Listagem de resultados com filtro por nome e categoria
- [ ] Estado vazio (nenhum resultado encontrado)

### 2.2 Carrinho
- [ ] Tela `CartScreen` — lista de itens, quantidades, subtotal, taxa de entrega, total
- [ ] Remover/ajustar quantidade de itens dentro do carrinho
- [ ] Conectar `CartBar` (no menu) ao `CartScreen`
- [ ] Observação/instrução para o restaurante (campo de texto)

### 2.3 Checkout e Pagamento
- [ ] Tela `CheckoutScreen` — resumo do pedido, endereço de entrega, forma de pagamento
- [ ] Seleção de endereço salvo ou novo
- [ ] Tela `PaymentScreen` — cartão de crédito, Pix, dinheiro
- [ ] Cupom de desconto (campo + validação)
- [ ] Confirmação antes de finalizar

### 2.4 Confirmação de pedido
- [ ] Tela `OrderConfirmationScreen` — animação de sucesso, número do pedido, ETA inicial

### 2.5 Rastreamento de entrega
- [ ] Tela `OrderTrackingScreen` com mapa (react-native-maps)
- [ ] Linha do tempo do pedido: Confirmado → Em preparo → Saiu para entrega → Entregue
- [ ] Posição do entregador em tempo real no mapa
- [ ] ETA dinâmico (atualiza conforme entregador se move)
- [ ] Botão para contatar o entregador

### 2.6 Histórico de pedidos
- [ ] Tela `OrdersListScreen` — lista de pedidos passados e pedido ativo
- [ ] Tela `OrderDetailScreen` — detalhes de um pedido específico
- [ ] Ação de repetir pedido
- [ ] Status visual por estado do pedido

### 2.7 Avaliação
- [ ] Modal de avaliação após entrega (estrelas + comentário)
- [ ] Avaliação do restaurante e do entregador separadas

### 2.8 Ofertas
- [ ] Tela `OffersScreen` — cupons disponíveis, promoções ativas
- [ ] Card de oferta com validade e código
- [ ] Aplicar cupom direto pelo card

### 2.9 Perfil do usuário
- [ ] Tela `ProfileScreen` — foto, nome, email, telefone
- [ ] Tela `EditProfileScreen` — editar dados pessoais
- [ ] Tela `AddressesScreen` — lista de endereços salvos (casa, trabalho, outros)
- [ ] Adicionar/editar/remover endereço com mapa
- [ ] Tela `PaymentMethodsScreen` — cartões salvos, Pix
- [ ] Adicionar/remover cartão
- [ ] Notificações — toggle de preferências
- [ ] Botão de logout

### 2.10 Favoritos
- [ ] Salvar restaurante como favorito (coração no card e na tela do menu)
- [ ] Tela ou seção de favoritos no perfil

---

## 3. App da Loja (Portal do Restaurante)

> Pode ser um app separado ou um modo alternativo acessado por login de lojista.

### 3.1 Autenticação da loja
- [ ] Login com credenciais de lojista
- [ ] Tela de seleção de estabelecimento (para quem tem mais de uma unidade)

### 3.2 Dashboard
- [ ] Resumo do dia: pedidos recebidos, faturamento, avaliação média
- [ ] Indicador de loja aberta/fechada com toggle rápido

### 3.3 Gestão de pedidos
- [ ] Tela de pedidos em tempo real (novos pedidos com notificação sonora)
- [ ] Ação: aceitar ou rejeitar pedido com motivo
- [ ] Atualizar status: Em preparo → Pronto para retirada
- [ ] Tempo estimado de preparo — editar por pedido

### 3.4 Cardápio
- [ ] Listagem de itens do cardápio
- [ ] Adicionar / editar / remover item (nome, descrição, preço, foto, categoria)
- [ ] Ativar/desativar item sem removê-lo (ex: item esgotado)
- [ ] Gerenciar categorias do cardápio

### 3.5 Configurações da loja
- [ ] Editar dados do restaurante (nome, endereço, telefone, foto de capa)
- [ ] Horários de funcionamento por dia da semana
- [ ] Raio de entrega e taxa de entrega
- [ ] Tempo padrão de preparo

### 3.6 Histórico e relatórios
- [ ] Histórico de pedidos com filtro por período
- [ ] Relatório simples: pedidos por dia, ticket médio
- [ ] Avaliações recebidas dos clientes

---

## 4. App do Entregador

> App separado ou modo alternativo acessado por login de entregador.

### 4.1 Autenticação do entregador
- [ ] Login com CPF e senha
- [ ] Tela de cadastro com dados pessoais, veículo e documentos

### 4.2 Disponibilidade
- [ ] Toggle "Estou disponível" na tela principal
- [ ] Indicador de status visível (online/offline)

### 4.3 Recebimento de corridas
- [ ] Tela de corrida disponível — notificação com restaurante, distância, valor estimado
- [ ] Aceitar ou recusar corrida dentro de um timer
- [ ] Ao aceitar: mapa com rota até o restaurante

### 4.4 Execução da entrega
- [ ] Tela de entrega ativa com mapa e rota em tempo real
- [ ] Confirmar retirada no restaurante
- [ ] Confirmar entrega ao cliente (com código ou foto)
- [ ] Contato com o cliente (telefone)
- [ ] Navegar com app externo (Google Maps / Waze)

### 4.5 Histórico e ganhos
- [ ] Tela de histórico de entregas
- [ ] Tela de ganhos: diário, semanal, mensal
- [ ] Extrato por entrega (valor, gorjeta, distância)

### 4.6 Perfil do entregador
- [ ] Editar dados pessoais e veículo
- [ ] Avaliações recebidas
- [ ] Documentos enviados e status de aprovação

---

## 5. API — Fase 1: Monólito Simples (MVP)

> Objetivo: ter uma API funcionando conectada ao mobile. Sem DDD, sem complexidade. Foco em entregar produto.

### 5.1 Setup inicial
- [ ] Criar projeto Node.js com Express + TypeScript em `api/`
- [ ] Configurar `tsconfig.json`, `eslint`, `prettier`
- [ ] Configurar banco PostgreSQL com Knex
- [ ] Criar schema único `public` com todas as tabelas
- [ ] Configurar variáveis de ambiente com `dotenv`
- [ ] Criar script de migrations e seeds iniciais

### 5.2 Autenticação
- [ ] `POST /auth/register` — cadastro de usuário
- [ ] `POST /auth/login` — login, retorna JWT
- [ ] `POST /auth/refresh` — renovar token
- [ ] Middleware de autenticação JWT
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
- [ ] Substituir `mock.ts` por chamadas reais à API
- [ ] Configurar `axios` com interceptor de token JWT
- [ ] Tratar erros de rede e expiração de sessão

---

## 6. API — Fase 2: Monólito Modular com DDD

> Objetivo: refatorar o monólito simples para estrutura modular com DDD. Preparar para extração futura em microsserviços.

### 6.1 Reestruturação de pastas
- [ ] Reorganizar código em módulos: `auth`, `ordering`, `restaurant`, `delivery`, `payments`
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
- [ ] Logs estruturados com `pino`
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
