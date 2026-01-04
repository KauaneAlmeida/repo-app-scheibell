# Documentação Backend - App Scheibell

## Stack Tecnológica

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| NestJS | 10.3.0 | Framework Node.js com TypeScript |
| PostgreSQL | 15+ | Banco de dados relacional |
| Prisma | 5.22.0 | ORM para banco de dados |
| Passport.js | - | Autenticação JWT |
| bcrypt | 5.1.1 | Hash de senhas |

---

## Módulos Implementados

| Módulo | Descrição |
|--------|-----------|
| **AuthModule** | Autenticação e autorização de usuários |
| **ContentModule** | Gerenciamento de conteúdo médico |
| **HealthModule** | Health checks da aplicação |
| **AppointmentsModule** | Agendamento de consultas |
| **MedicationsModule** | Rastreamento de medicações |
| **ChatModule** | Chatbot IA para orientação pós-operatória |
| **ExamsModule** | Gerenciamento de exames |
| **TrainingModule** | Protocolos de treino pós-operatório |

---

## Modelos de Dados (Prisma)

### Usuários e Clínicas

```prisma
User {
  id, name, email, passwordHash, role, clinicId
}

Clinic {
  id, name, email, phone, address, logo, primaryColor, secondaryColor
}

Patient {
  id, userId, clinicId, cpf, phone, birthDate, surgeryDate, surgeryType
}
```

### Roles de Usuário

| Role | Descrição |
|------|-----------|
| `PATIENT` | Paciente |
| `CLINIC_ADMIN` | Administrador da clínica |
| `CLINIC_STAFF` | Funcionário da clínica |
| `THIRD_PARTY` | Terceiro/Parceiro |

### Consultas

```prisma
Appointment {
  id, patientId, title, description, date, time, type, status, location, notes
}
```

**Status**: PENDING, CONFIRMED, CANCELLED, COMPLETED
**Tipos**: RETURN_VISIT, EVALUATION, PHYSIOTHERAPY, EXAM, OTHER

### Medicações

```prisma
MedicationLog {
  id, patientId, contentId, takenAt, scheduledTime
}
```

### Exames

```prisma
Exam {
  id, patientId, title, type, date, status, fileUrl, fileName, notes, result
}
```

**Status**: PENDING, AVAILABLE, VIEWED

### Conteúdo

```prisma
SystemContentTemplate {
  id, type, category, title, description, validFromDay, validUntilDay, sortOrder
}

ClinicContent {
  id, clinicId, templateId, type, category, title, description, isActive
}

PatientContentAdjustment {
  id, patientId, type (ADD/DISABLE/MODIFY), baseContentId, customContent
}
```

**Tipos de Conteúdo**: SYMPTOMS, DIET, ACTIVITIES, CARE, TRAINING, EXAMS, DOCUMENTS, MEDICATIONS, DIARY

**Categorias**:
- Verde: NORMAL, ALLOWED
- Amarelo: WARNING, RESTRICTED
- Vermelho: EMERGENCY, PROHIBITED
- Informativo: INFO

### Treino

```prisma
TrainingProtocol {
  id, clinicId, name, surgeryType, totalWeeks, isDefault
}

TrainingWeek {
  id, protocolId, weekNumber, title, objective, maxHeartRate, canDo[], avoid[]
}

TrainingSession {
  id, weekId, sessionNumber, name, description, duration, intensity
}

PatientTrainingProgress {
  id, patientId, weekId, status (COMPLETED/CURRENT/FUTURE)
}
```

### Chat

```prisma
ChatConversation {
  id, patientId, title
}

ChatMessage {
  id, conversationId, role (user/assistant/system), content
}
```

---

## Endpoints da API

Todos os endpoints são prefixados com `/api`

### Auth (`/auth`)

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/auth/register` | Público | Registrar novo usuário |
| POST | `/auth/login` | Público | Login |
| GET | `/auth/me` | Autenticado | Perfil do usuário |
| PUT | `/auth/me` | Autenticado | Atualizar perfil |
| POST | `/auth/change-password` | Autenticado | Alterar senha |
| GET | `/auth/validate` | Autenticado | Validar token JWT |

**Registro:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min 6)",
  "role": "PATIENT|CLINIC_ADMIN|CLINIC_STAFF|THIRD_PARTY",
  "clinicId": "string (opcional)"
}
```

**Login:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Resposta:**
```json
{
  "user": { "id", "name", "email", "role", "clinicId" },
  "accessToken": "JWT token",
  "expiresIn": 86400
}
```

---

### Appointments (`/appointments`)

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| GET | `/appointments` | PATIENT | Listar consultas |
| GET | `/appointments/upcoming` | PATIENT | Próximas consultas |
| GET | `/appointments/:id` | PATIENT | Detalhes da consulta |
| POST | `/appointments` | PATIENT | Criar consulta |
| PATCH | `/appointments/:id/status` | PATIENT | Atualizar status |
| PATCH | `/appointments/:id/cancel` | PATIENT | Cancelar |
| PATCH | `/appointments/:id/confirm` | PATIENT | Confirmar |

**Criar Consulta:**
```json
{
  "title": "string",
  "description": "string",
  "date": "2024-01-15",
  "time": "09:00",
  "type": "RETURN_VISIT|EVALUATION|PHYSIOTHERAPY|EXAM|OTHER",
  "location": "string",
  "notes": "string"
}
```

---

### Medications (`/medications`)

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/medications/log` | PATIENT | Registrar medicação tomada |
| GET | `/medications/logs` | PATIENT | Histórico de medicações |
| GET | `/medications/today` | PATIENT | Logs de hoje |
| GET | `/medications/adherence` | PATIENT | Calcular aderência % |
| GET | `/medications/check/:contentId/:scheduledTime` | PATIENT | Verificar se tomou hoje |
| DELETE | `/medications/log/:id` | PATIENT | Desfazer registro |

**Registrar Medicação:**
```json
{
  "contentId": "string",
  "scheduledTime": "08:00",
  "takenAt": "2024-01-15T08:05:00Z"
}
```

**Resposta Aderência:**
```json
{
  "adherence": 85.7,
  "taken": 12,
  "expected": 14,
  "medicationsCount": 2
}
```

---

### Chat (`/chat`)

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/chat/send` | PATIENT | Enviar mensagem para IA |
| GET | `/chat/history` | PATIENT | Histórico da conversa |
| GET | `/chat/conversations` | PATIENT | Listar conversas |

**Enviar Mensagem:**
```json
{
  "message": "string",
  "conversationId": "string (opcional)"
}
```

**Recursos:**
- Integração com OpenAI (gpt-4o-mini)
- Fallback para respostas locais se API indisponível
- Orientação pós-operatória para cirurgias bariátricas/estéticas

---

### Exams (`/exams`)

**Rotas do Paciente:**

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| GET | `/exams/patient` | PATIENT | Listar exames |
| GET | `/exams/patient/stats` | PATIENT | Estatísticas |
| GET | `/exams/patient/:id` | PATIENT | Detalhes do exame |
| PATCH | `/exams/patient/:id/viewed` | PATIENT | Marcar como visualizado |

**Rotas da Clínica:**

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| POST | `/exams` | STAFF | Criar exame |
| PUT | `/exams/:id` | STAFF | Atualizar exame |
| DELETE | `/exams/:id` | STAFF | Excluir exame |
| POST | `/exams/:id/file` | STAFF | Anexar arquivo |

---

### Training (`/training`)

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| GET | `/training/dashboard` | PATIENT | Dashboard completo |
| GET | `/training/protocol` | PATIENT | Protocolo de treino |
| GET | `/training/progress` | PATIENT | Progresso geral |
| GET | `/training/weeks/:weekNumber` | PATIENT | Detalhes da semana |
| POST | `/training/sessions/:sessionId/complete` | PATIENT | Completar sessão |
| DELETE | `/training/sessions/:sessionId/complete` | PATIENT | Desmarcar sessão |

**Dashboard Retorna:**
```json
{
  "daysSinceSurgery": 14,
  "currentWeekNumber": 2,
  "protocolName": "Protocolo Rinoplastia Padrão",
  "totalWeeks": 8,
  "progressPercentage": 12.5,
  "weeks": [
    {
      "weekNumber": 1,
      "title": "Semana 1",
      "status": "COMPLETED",
      "objective": "Repouso absoluto",
      "maxHeartRate": null,
      "canDo": ["Repouso em casa", "..."],
      "avoid": ["Qualquer esforço físico", "..."],
      "sessions": [...]
    }
  ]
}
```

---

### Content (`/content`)

**Rotas da Clínica (CLINIC_ADMIN, CLINIC_STAFF):**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/content/clinic` | Listar conteúdos |
| GET | `/content/clinic/all` | Todos por tipo |
| GET | `/content/clinic/stats` | Estatísticas |
| POST | `/content/clinic` | Criar conteúdo |
| PUT | `/content/clinic/:id` | Atualizar |
| PATCH | `/content/clinic/:id/toggle` | Ativar/desativar |
| DELETE | `/content/clinic/:id` | Excluir |
| POST | `/content/clinic/sync` | Sincronizar templates |

**Rotas do Paciente:**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/content/patient/me` | Conteúdo personalizado |
| GET | `/content/patient/clinic` | Conteúdo da clínica |
| POST | `/content/patient/medication` | Adicionar medicação |
| GET | `/content/patient/training-protocol` | Protocolo de treino |

**Ajustes por Paciente (STAFF):**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/content/patients/:patientId/adjustments` | Listar ajustes |
| POST | `/content/patients/:patientId/adjustments/add` | Adicionar conteúdo |
| POST | `/content/patients/:patientId/adjustments/disable` | Desabilitar conteúdo |
| POST | `/content/patients/:patientId/adjustments/modify` | Modificar conteúdo |
| DELETE | `/content/patients/:patientId/adjustments/:id` | Remover ajuste |

---

### Health (`/health`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Status geral |
| GET | `/health/live` | Liveness probe |
| GET | `/health/ready` | Readiness probe |

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "services": {
    "database": "connected"
  }
}
```

---

## Autenticação

### JWT Strategy

- **Header**: `Authorization: Bearer <token>`
- **Expiração**: 24 horas (configurável via `JWT_EXPIRATION`)
- **Secret**: Configurável via `JWT_SECRET`

### Payload do Token

```json
{
  "sub": "user-id",
  "email": "user@email.com",
  "role": "PATIENT",
  "clinicId": "clinic-id",
  "patientId": "patient-id"
}
```

### Guards

| Guard | Descrição |
|-------|-----------|
| `JwtAuthGuard` | Valida token JWT |
| `RolesGuard` | Verifica role do usuário |

### Decorators

| Decorator | Uso |
|-----------|-----|
| `@Roles('PATIENT', 'CLINIC_ADMIN')` | Define roles permitidas |
| `@CurrentUser()` | Obtém usuário atual |
| `@CurrentUser('patientId')` | Obtém campo específico |

---

## Variáveis de Ambiente

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
DATABASE_URL="postgresql://postgres:senha@localhost:5433/app_scheibell?schema=public"

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:8080

# OpenAI (opcional - para chat)
OPENAI_API_KEY=sk-...
```

---

## Usuários de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| Admin Clínica | admin@clinica.com | 123456 |
| Staff Clínica | staff@clinica.com | 123456 |
| Terceiro | terceiro@parceiro.com | 123456 |
| Paciente | paciente@teste.com | 123456 |

---

## Comandos

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Aplicar schema no banco
npx prisma db push

# Rodar seed (dados iniciais)
npx ts-node prisma/seed.ts

# Iniciar em desenvolvimento
npm run start:dev

# Iniciar em produção
npm run start:prod

# Visualizar banco (Prisma Studio)
npx prisma studio
```

---

## Estrutura de Pastas

```
backend/
├── prisma/
│   ├── schema.prisma      # Modelos do banco
│   └── seed.ts            # Dados iniciais
├── src/
│   ├── main.ts            # Bootstrap da aplicação
│   ├── app.module.ts      # Módulo principal
│   ├── prisma/            # Serviço Prisma
│   └── modules/
│       ├── auth/          # Autenticação
│       ├── appointments/  # Consultas
│       ├── chat/          # Chat IA
│       ├── content/       # Conteúdo
│       ├── exams/         # Exames
│       ├── health/        # Health checks
│       ├── medications/   # Medicações
│       └── training/      # Treinos
├── .env                   # Variáveis de ambiente
└── package.json
```

---

## Funcionalidades Principais

1. **Gestão de Pacientes Pós-Operatórios**
   - Acompanhamento desde a cirurgia até recuperação completa
   - Protocolos de treino personalizados por semana
   - Rastreamento de medicações com cálculo de aderência

2. **Chatbot IA**
   - Orientação 24/7 para dúvidas pós-operatórias
   - Integração com OpenAI
   - Respostas locais como fallback

3. **Gestão de Conteúdo**
   - Templates do sistema
   - Personalização por clínica
   - Ajustes individuais por paciente

4. **Controle de Acesso**
   - 4 tipos de usuários com permissões diferentes
   - JWT com expiração configurável
   - Guards para proteção de rotas

5. **Multi-Clínica**
   - Suporte a múltiplas clínicas
   - Conteúdo separado por clínica
   - Branding personalizado (cores, logo)
