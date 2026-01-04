# Sistema de Gestão de Conteúdo - App Scheibell

## Visão Geral

O sistema de gestão de conteúdo permite que médicos/administradores da clínica personalizem o conteúdo pós-operatório para cada paciente individualmente. O conteúdo base é definido pela clínica e pode ser modificado, desabilitado ou ter itens exclusivos adicionados para pacientes específicos.

---

## 📋 Módulos e Categorias

O sistema possui **8 módulos** de conteúdo, cada um organizado em **abas/categorias** específicas:

### 🩺 SINTOMAS (`SYMPTOMS`)
Gerenciamento de sintomas pós-operatórios

| Aba | Descrição | Cor | Categorias API |
|-----|-----------|-----|----------------|
| **Normais** | Sintomas esperados e seguros | 🟢 Verde | `NORMAL`, `ALLOWED` |
| **Atenção** | Sintomas que requerem monitoramento | 🟠 Laranja | `WARNING`, `RESTRICTED` |
| **Emergência** | Sintomas graves - procurar atendimento | 🔴 Vermelho | `EMERGENCY`, `PROHIBITED` |

---

### 💊 CUIDADOS (`CARE`)
Instruções de cuidados pós-operatórios

| Aba | Descrição | Cor | Categorias API |
|-----|-----------|-----|----------------|
| **Cuidado** | Atenção especial necessária | 🔴 Vermelho | `EMERGENCY`, `PROHIBITED` |
| **Fazer** | Ações obrigatórias | 🟢 Verde | `NORMAL`, `ALLOWED` |
| **Opcional** | Recomendações opcionais | 🔵 Azul | `INFO`, `WARNING` |
| **Não necessário** | Não precisa fazer | ⚪ Cinza | `RESTRICTED` |

---

### 🏃 ATIVIDADES (`ACTIVITIES`)
Controle de atividades físicas permitidas

| Aba | Descrição | Cor | Categorias API |
|-----|-----------|-----|----------------|
| **Permitidas** | Atividades liberadas | 🟢 Verde | `ALLOWED`, `NORMAL` |
| **Evitar** | Atividades a serem evitadas | 🟠 Laranja | `WARNING`, `RESTRICTED` |
| **Proibidas** | Atividades totalmente proibidas | 🔴 Vermelho | `PROHIBITED`, `EMERGENCY` |

---

### 🍎 DIETA (`DIET`)
Orientações alimentares

| Aba | Descrição | Cor | Categorias API |
|-----|-----------|-----|----------------|
| **Recomendados** | Alimentos indicados | 🟢 Verde | `ALLOWED`, `NORMAL`, `INFO` |
| **Evitar** | Alimentos a serem evitados | 🟠 Laranja | `WARNING`, `RESTRICTED` |
| **Proibidos** | Alimentos totalmente proibidos | 🔴 Vermelho | `PROHIBITED`, `EMERGENCY` |

---

### 💉 MEDICAÇÕES (`MEDICATIONS`)
Gerenciamento de medicamentos

| Aba | Descrição | Cor | Categorias API |
|-----|-----------|-----|----------------|
| **Recomendados** | Medicamentos prescritos/indicados | 🟢 Verde | `ALLOWED`, `NORMAL`, `INFO` |
| **Evitar** | Medicamentos a serem evitados | 🟠 Laranja | `WARNING`, `RESTRICTED` |
| **Proibidos** | Medicamentos contraindicados | 🔴 Vermelho | `PROHIBITED`, `EMERGENCY` |

---

### 🔬 EXAMES (`EXAMS`)
Exames e procedimentos

| Aba | Descrição | Cor | Categorias API |
|-----|-----------|-----|----------------|
| **Recomendados** | Exames necessários | 🟢 Verde | `ALLOWED`, `NORMAL`, `INFO` |
| **Evitar** | Exames a serem adiados | 🟠 Laranja | `WARNING`, `RESTRICTED` |
| **Proibidos** | Exames contraindicados | 🔴 Vermelho | `PROHIBITED`, `EMERGENCY` |

---

### 🏋️ TREINOS (`TRAINING`)
Exercícios e treinos físicos

| Aba | Descrição | Cor | Categorias API |
|-----|-----------|-----|----------------|
| **Recomendados** | Exercícios indicados | 🟢 Verde | `NORMAL`, `ALLOWED`, `INFO` |
| **Evitar** | Exercícios a serem evitados | 🟠 Laranja | `WARNING`, `RESTRICTED` |
| **Proibidos** | Exercícios proibidos | 🔴 Vermelho | `EMERGENCY`, `PROHIBITED` |

---

### 📄 DOCUMENTOS (`DOCUMENTS`)
Documentos e orientações

| Aba | Descrição | Cor | Categorias API |
|-----|-----------|-----|----------------|
| **Importantes** | Documentos prioritários | 🔴 Vermelho | `EMERGENCY`, `PROHIBITED`, `WARNING` |
| **Informativos** | Documentos informativos | 🔵 Azul | `NORMAL`, `ALLOWED`, `INFO` |
| **Arquivados** | Documentos arquivados | ⚪ Cinza | `RESTRICTED` |

---

## 📊 Resumo das Categorias por Módulo

```
┌─────────────────┬───────────────────────────────────────────────────────────┐
│     MÓDULO      │                      CATEGORIAS/ABAS                       │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ SINTOMAS        │ 🟢 Normais      │ 🟠 Atenção       │ 🔴 Emergência         │
├─────────────────┼─────────────────┼──────────────────┼───────────────────────┤
│ CUIDADOS        │ 🔴 Cuidado │ 🟢 Fazer │ 🔵 Opcional │ ⚪ Não necessário    │
├─────────────────┼─────────────────┼──────────────────┼───────────────────────┤
│ ATIVIDADES      │ 🟢 Permitidas   │ 🟠 Evitar        │ 🔴 Proibidas          │
├─────────────────┼─────────────────┼──────────────────┼───────────────────────┤
│ DIETA           │ 🟢 Recomendados │ 🟠 Evitar        │ 🔴 Proibidos          │
├─────────────────┼─────────────────┼──────────────────┼───────────────────────┤
│ MEDICAÇÕES      │ 🟢 Recomendados │ 🟠 Evitar        │ 🔴 Proibidos          │
├─────────────────┼─────────────────┼──────────────────┼───────────────────────┤
│ EXAMES          │ 🟢 Recomendados │ 🟠 Evitar        │ 🔴 Proibidos          │
├─────────────────┼─────────────────┼──────────────────┼───────────────────────┤
│ TREINOS         │ 🟢 Recomendados │ 🟠 Evitar        │ 🔴 Proibidos          │
├─────────────────┼─────────────────┼──────────────────┼───────────────────────┤
│ DOCUMENTOS      │ 🔴 Importantes  │ 🔵 Informativos  │ ⚪ Arquivados         │
└─────────────────┴─────────────────┴──────────────────┴───────────────────────┘
```

### Legenda de Cores
- 🟢 **Verde**: Itens seguros, permitidos ou recomendados
- 🟠 **Laranja**: Itens que requerem atenção ou devem ser evitados
- 🔴 **Vermelho**: Itens de emergência, proibidos ou prioritários
- 🔵 **Azul**: Itens informativos ou opcionais
- ⚪ **Cinza**: Itens arquivados, não necessários ou restritos

---

## Arquitetura do Sistema

### Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Backend | NestJS | ^10.x |
| Banco de Dados | PostgreSQL + Prisma ORM | 5.x |
| Frontend Mobile | Flutter | ^3.x |
| Autenticação | JWT | - |
| HTTP Client | Dio | ^5.x |

### Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        FLUTTER APP                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Screens   │  │   Widgets   │  │      API Service        │  │
│  │  (8 telas)  │──│  (Patient   │──│  (Dio + Interceptors)   │  │
│  │             │  │   Selector) │  │                         │  │
│  └─────────────┘  └─────────────┘  └───────────┬─────────────┘  │
└────────────────────────────────────────────────┼────────────────┘
                                                 │ HTTPS/REST
                                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        NESTJS API                                │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Controllers │──│  Services   │──│     Prisma Client       │  │
│  │             │  │             │  │                         │  │
│  └─────────────┘  └─────────────┘  └───────────┬─────────────┘  │
└────────────────────────────────────────────────┼────────────────┘
                                                 │
                                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      POSTGRESQL                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ ClinicContent│  │PatientAdj.  │  │   Users/Patients        │  │
│  │             │  │             │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Backend (NestJS)

### Estrutura de Pastas

```
src/
├── clinic-content/
│   ├── clinic-content.controller.ts
│   ├── clinic-content.service.ts
│   ├── clinic-content.module.ts
│   └── dto/
│       ├── create-content.dto.ts
│       └── update-content.dto.ts
├── patient-adjustments/
│   ├── patient-adjustments.controller.ts
│   ├── patient-adjustments.service.ts
│   ├── patient-adjustments.module.ts
│   └── dto/
│       ├── add-adjustment.dto.ts
│       ├── modify-adjustment.dto.ts
│       └── disable-adjustment.dto.ts
└── prisma/
    └── schema.prisma
```

### Schema Prisma

```prisma
// Conteúdo base da clínica
model ClinicContent {
  id              String          @id @default(uuid())
  clinicId        String
  type            ContentType
  category        ContentCategory
  title           String
  description     String?
  validFromDay    Int             @default(0)
  validUntilDay   Int?
  order           Int             @default(0)
  isActive        Boolean         @default(true)
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  clinic          Clinic          @relation(fields: [clinicId], references: [id])
  adjustments     PatientContentAdjustment[]

  @@index([clinicId, type])
  @@index([clinicId, type, category])
}

// Ajustes personalizados por paciente
model PatientContentAdjustment {
  id                  String          @id @default(uuid())
  patientId           String
  baseContentId       String?         // null para itens ADD
  adjustmentType      AdjustmentType
  customType          ContentType?
  customCategory      ContentCategory?
  customTitle         String?
  customDescription   String?
  customValidFromDay  Int?
  customValidUntilDay Int?
  reason              String?
  createdAt           DateTime        @default(now())
  updatedAt           DateTime        @updatedAt
  createdBy           String?

  patient             User            @relation(fields: [patientId], references: [id])
  baseContent         ClinicContent?  @relation(fields: [baseContentId], references: [id])

  @@index([patientId])
  @@index([patientId, customType])
  @@index([baseContentId])
}

enum ContentType {
  SYMPTOMS
  CARE
  ACTIVITIES
  DIET
  MEDICATIONS
  EXAMS
  TRAINING
  DOCUMENTS
}

enum ContentCategory {
  NORMAL
  ALLOWED
  WARNING
  RESTRICTED
  PROHIBITED
  EMERGENCY
  INFO
}

enum AdjustmentType {
  ADD
  MODIFY
  DISABLE
}
```

### Endpoints da API

#### Conteúdo da Clínica

```typescript
// GET /clinic-content?type={TYPE}
// Headers: Authorization: Bearer {token}
// Response: ClinicContent[]

@Get()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DOCTOR')
async getClinicContent(
  @Query('type') type?: ContentType,
  @Req() req: RequestWithUser,
): Promise<ClinicContent[]> {
  return this.clinicContentService.findByClinic(
    req.user.clinicId,
    type,
  );
}
```

#### Ajustes do Paciente

```typescript
// GET /patients/:id/adjustments?type={TYPE}
@Get(':id/adjustments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DOCTOR')
async getPatientAdjustments(
  @Param('id') patientId: string,
  @Query('type') type?: ContentType,
): Promise<PatientContentAdjustment[]> {
  return this.adjustmentsService.findByPatient(patientId, type);
}

// POST /patients/:id/adjustments (ADD)
@Post(':id/adjustments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DOCTOR')
async addContentForPatient(
  @Param('id') patientId: string,
  @Body() dto: AddAdjustmentDto,
  @Req() req: RequestWithUser,
): Promise<PatientContentAdjustment> {
  return this.adjustmentsService.addContent(patientId, dto, req.user.id);
}

// POST /patients/:id/adjustments/modify (MODIFY)
@Post(':id/adjustments/modify')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DOCTOR')
async modifyContentForPatient(
  @Param('id') patientId: string,
  @Body() dto: ModifyAdjustmentDto,
  @Req() req: RequestWithUser,
): Promise<PatientContentAdjustment> {
  return this.adjustmentsService.modifyContent(patientId, dto, req.user.id);
}

// POST /patients/:id/adjustments/disable (DISABLE)
@Post(':id/adjustments/disable')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DOCTOR')
async disableContentForPatient(
  @Param('id') patientId: string,
  @Body() dto: DisableAdjustmentDto,
  @Req() req: RequestWithUser,
): Promise<PatientContentAdjustment> {
  return this.adjustmentsService.disableContent(patientId, dto, req.user.id);
}

// DELETE /patients/:id/adjustments/:adjustmentId
@Delete(':id/adjustments/:adjustmentId')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DOCTOR')
async removePatientAdjustment(
  @Param('id') patientId: string,
  @Param('adjustmentId') adjustmentId: string,
): Promise<void> {
  return this.adjustmentsService.remove(patientId, adjustmentId);
}
```

### DTOs (Data Transfer Objects)

```typescript
// add-adjustment.dto.ts
export class AddAdjustmentDto {
  @IsEnum(ContentType)
  customType: ContentType;

  @IsEnum(ContentCategory)
  customCategory: ContentCategory;

  @IsString()
  @IsNotEmpty()
  customTitle: string;

  @IsString()
  @IsOptional()
  customDescription?: string;

  @IsInt()
  @IsOptional()
  customValidFromDay?: number;

  @IsInt()
  @IsOptional()
  customValidUntilDay?: number;

  @IsString()
  @IsOptional()
  reason?: string;
}

// modify-adjustment.dto.ts
export class ModifyAdjustmentDto {
  @IsUUID()
  baseContentId: string;

  @IsString()
  @IsOptional()
  customTitle?: string;

  @IsString()
  @IsOptional()
  customDescription?: string;

  @IsString()
  @IsOptional()
  reason?: string;
}

// disable-adjustment.dto.ts
export class DisableAdjustmentDto {
  @IsUUID()
  baseContentId: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
```

### Service Layer - Lógica de Negócio

```typescript
// patient-adjustments.service.ts
@Injectable()
export class PatientAdjustmentsService {
  constructor(private prisma: PrismaService) {}

  async addContent(
    patientId: string,
    dto: AddAdjustmentDto,
    createdBy: string,
  ): Promise<PatientContentAdjustment> {
    return this.prisma.patientContentAdjustment.create({
      data: {
        patientId,
        adjustmentType: 'ADD',
        customType: dto.customType,
        customCategory: dto.customCategory,
        customTitle: dto.customTitle,
        customDescription: dto.customDescription,
        customValidFromDay: dto.customValidFromDay ?? 0,
        customValidUntilDay: dto.customValidUntilDay,
        reason: dto.reason,
        createdBy,
      },
    });
  }

  async modifyContent(
    patientId: string,
    dto: ModifyAdjustmentDto,
    createdBy: string,
  ): Promise<PatientContentAdjustment> {
    // Verifica se já existe um ajuste para este conteúdo
    const existing = await this.prisma.patientContentAdjustment.findFirst({
      where: {
        patientId,
        baseContentId: dto.baseContentId,
      },
    });

    if (existing) {
      // Atualiza o existente
      return this.prisma.patientContentAdjustment.update({
        where: { id: existing.id },
        data: {
          adjustmentType: 'MODIFY',
          customTitle: dto.customTitle,
          customDescription: dto.customDescription,
          reason: dto.reason,
        },
      });
    }

    // Cria novo ajuste
    return this.prisma.patientContentAdjustment.create({
      data: {
        patientId,
        baseContentId: dto.baseContentId,
        adjustmentType: 'MODIFY',
        customTitle: dto.customTitle,
        customDescription: dto.customDescription,
        reason: dto.reason,
        createdBy,
      },
    });
  }

  async disableContent(
    patientId: string,
    dto: DisableAdjustmentDto,
    createdBy: string,
  ): Promise<PatientContentAdjustment> {
    // Similar ao modify, mas com adjustmentType: 'DISABLE'
    const existing = await this.prisma.patientContentAdjustment.findFirst({
      where: {
        patientId,
        baseContentId: dto.baseContentId,
      },
    });

    if (existing) {
      return this.prisma.patientContentAdjustment.update({
        where: { id: existing.id },
        data: {
          adjustmentType: 'DISABLE',
          reason: dto.reason,
        },
      });
    }

    return this.prisma.patientContentAdjustment.create({
      data: {
        patientId,
        baseContentId: dto.baseContentId,
        adjustmentType: 'DISABLE',
        reason: dto.reason,
        createdBy,
      },
    });
  }

  async remove(patientId: string, adjustmentId: string): Promise<void> {
    await this.prisma.patientContentAdjustment.deleteMany({
      where: {
        id: adjustmentId,
        patientId, // Garante que pertence ao paciente
      },
    });
  }
}
```

---

## Frontend (Flutter)

### Estrutura de Arquivos

```
lib/
├── core/
│   └── services/
│       └── api_service.dart          # Cliente HTTP centralizado
├── features/
│   ├── clinic/
│   │   ├── screens/
│   │   │   ├── clinic_symptoms_screen.dart
│   │   │   ├── clinic_care_screen.dart
│   │   │   ├── clinic_activities_screen.dart
│   │   │   ├── clinic_diet_screen.dart
│   │   │   ├── clinic_medications_screen.dart
│   │   │   ├── clinic_exams_screen.dart
│   │   │   ├── clinic_training_screen.dart
│   │   │   └── clinic_documents_screen.dart
│   │   └── widgets/
│   │       └── patient_selector_widget.dart
│   └── patient/
│       └── screens/
│           └── ... (telas do paciente)
└── main.dart
```

### API Service - Implementação

```dart
// lib/core/services/api_service.dart

class ApiService {
  late final Dio _dio;
  static const String baseUrl = 'https://api.scheibell.com/v1';

  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    // Interceptor para adicionar token
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _getToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (error, handler) {
        if (error.response?.statusCode == 401) {
          // Token expirado - redirecionar para login
          _handleUnauthorized();
        }
        return handler.next(error);
      },
    ));
  }

  // Buscar conteúdo base da clínica
  Future<List<dynamic>> getClinicContentByType({required String type}) async {
    try {
      final response = await _dio.get(
        '/clinic-content',
        queryParameters: {'type': type},
      );
      return response.data as List<dynamic>;
    } on DioException {
      rethrow;
    }
  }

  // Buscar ajustes do paciente
  Future<List<dynamic>> getPatientAdjustments(
    String patientId, {
    String? type,
  }) async {
    try {
      final response = await _dio.get(
        '/patients/$patientId/adjustments',
        queryParameters: type != null ? {'type': type} : null,
      );
      return response.data as List<dynamic>;
    } on DioException {
      rethrow;
    }
  }

  // Adicionar conteúdo exclusivo para paciente
  Future<dynamic> addContentForPatient(
    String patientId,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _dio.post(
        '/patients/$patientId/adjustments',
        data: data,
      );
      return response.data;
    } on DioException {
      rethrow;
    }
  }

  // Modificar conteúdo existente
  Future<dynamic> modifyContentForPatient(
    String patientId,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _dio.post(
        '/patients/$patientId/adjustments/modify',
        data: data,
      );
      return response.data;
    } on DioException {
      rethrow;
    }
  }

  // Desabilitar conteúdo
  Future<dynamic> disableContentForPatient(
    String patientId,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _dio.post(
        '/patients/$patientId/adjustments/disable',
        data: data,
      );
      return response.data;
    } on DioException {
      rethrow;
    }
  }

  // Remover ajuste
  Future<void> removePatientAdjustment(
    String patientId,
    String adjustmentId,
  ) async {
    try {
      await _dio.delete('/patients/$patientId/adjustments/$adjustmentId');
    } on DioException {
      rethrow;
    }
  }

  // Mapear erros do Dio para mensagens amigáveis
  AppException mapDioError(DioException e) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return AppException(message: 'Tempo de conexão esgotado');
      case DioExceptionType.connectionError:
        return AppException(message: 'Sem conexão com a internet');
      case DioExceptionType.badResponse:
        final statusCode = e.response?.statusCode;
        final message = e.response?.data['message'] ?? 'Erro desconhecido';
        return AppException(message: message, statusCode: statusCode);
      default:
        return AppException(message: 'Erro inesperado');
    }
  }
}

class AppException implements Exception {
  final String message;
  final int? statusCode;

  AppException({required this.message, this.statusCode});
}
```

### Estrutura do Modal de Gestão

```dart
// Estrutura base usada em todas as 8 telas

class _PatientContentModal extends StatefulWidget {
  final String patientId;
  final String patientName;
  final Map<String, dynamic> patient;

  const _PatientContentModal({
    required this.patientId,
    required this.patientName,
    required this.patient,
  });

  @override
  State<_PatientContentModal> createState() => _PatientContentModalState();
}

class _PatientContentModalState extends State<_PatientContentModal>
    with SingleTickerProviderStateMixin {

  final ApiService _api = ApiService();
  late TabController _tabController;

  List<dynamic> _clinicContent = [];
  List<dynamic> _adjustments = [];
  bool _isLoading = true;
  String? _error;

  // Configuração de abas (varia por tela)
  final List<Map<String, dynamic>> _tabs = [
    {
      'label': 'Tab 1',
      'categories': ['CATEGORY_1', 'CATEGORY_2'],
      'color': Colors.green,
      'icon': Icons.check_circle,
    },
    // ... mais abas
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _tabs.length, vsync: this);
    _loadData();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadData() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      // Carrega dados em paralelo
      final results = await Future.wait([
        _api.getClinicContentByType(type: 'CONTENT_TYPE'),
        _api.getPatientAdjustments(widget.patientId, type: 'CONTENT_TYPE'),
      ]);

      if (mounted) {
        setState(() {
          _clinicContent = results[0];
          _adjustments = results[1];
          _isLoading = false;
        });
      }
    } on DioException catch (e) {
      if (mounted) {
        setState(() {
          _error = _api.mapDioError(e).message;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = 'Erro ao carregar dados: $e';
          _isLoading = false;
        });
      }
    }
  }

  // Filtra itens para cada aba
  List<Map<String, dynamic>> _getItemsForTab(int tabIndex) {
    final categories = _tabs[tabIndex]['categories'] as List<String>;
    final List<Map<String, dynamic>> result = [];

    // 1. Conteúdo da clínica (com ajustes aplicados)
    for (final item in _clinicContent) {
      final category = (item['category'] ?? '').toString().toUpperCase();
      if (categories.contains(category)) {
        final contentId = item['id']?.toString() ?? '';
        final adjustment = _getAdjustmentForContent(contentId);

        if (adjustment != null && adjustment['adjustmentType'] == 'DISABLE') {
          result.add({
            ...Map<String, dynamic>.from(item),
            'isDisabled': true,
            'adjustment': adjustment,
          });
        } else if (adjustment != null && adjustment['adjustmentType'] == 'MODIFY') {
          result.add({
            ...Map<String, dynamic>.from(item),
            'title': adjustment['customTitle'] ?? item['title'],
            'description': adjustment['customDescription'] ?? item['description'],
            'isModified': true,
            'adjustment': adjustment,
          });
        } else {
          result.add(Map<String, dynamic>.from(item));
        }
      }
    }

    // 2. Itens exclusivos (ADD)
    for (final adj in _adjustments) {
      if (adj['adjustmentType'] != 'ADD') continue;
      final category = (adj['customCategory'] ?? '').toString().toUpperCase();
      if (categories.contains(category)) {
        result.add({
          'id': adj['id'],
          'title': adj['customTitle'],
          'description': adj['customDescription'],
          'category': adj['customCategory'],
          'isExclusive': true,
          'adjustment': adj,
        });
      }
    }

    return result;
  }

  Map<String, dynamic>? _getAdjustmentForContent(String contentId) {
    try {
      return _adjustments.firstWhere(
        (adj) => adj['baseContentId'] == contentId,
      ) as Map<String, dynamic>;
    } catch (_) {
      return null;
    }
  }

  // ... métodos de CRUD
}
```

### Padrão de Operações CRUD

```dart
// ADICIONAR
Future<void> _addContent(int tabIndex) async {
  final tab = _tabs[tabIndex];
  final defaultCategory = (tab['categories'] as List<String>).first;

  final result = await showDialog<Map<String, dynamic>>(
    context: context,
    builder: (context) => _AddContentDialog(
      title: 'Adicionar em ${tab['label']}',
      defaultCategory: defaultCategory,
    ),
  );

  if (result != null && mounted) {
    try {
      await _api.addContentForPatient(widget.patientId, {
        'customType': 'CONTENT_TYPE',
        'customCategory': result['category'] ?? defaultCategory,
        'customTitle': result['title'],
        'customDescription': result['description'],
        'customValidFromDay': 0,
        'customValidUntilDay': null,
        'reason': 'Adicionado pelo médico',
      });

      await _loadData(); // CRÍTICO: aguardar reload

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Item adicionado com sucesso!'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao adicionar: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}

// EDITAR
Future<void> _editContent(Map<String, dynamic> item) async {
  final result = await showDialog<Map<String, dynamic>>(
    context: context,
    builder: (context) => _EditContentDialog(
      currentTitle: item['title'],
      currentDescription: item['description'],
    ),
  );

  if (result != null && mounted) {
    try {
      if (item['isExclusive'] == true) {
        // Item exclusivo: remove e recria
        await _api.removePatientAdjustment(
          widget.patientId,
          item['id']?.toString() ?? '',
        );
        await _api.addContentForPatient(widget.patientId, {
          'customType': 'CONTENT_TYPE',
          'customCategory': item['category'],
          'customTitle': result['title'],
          'customDescription': result['description'],
          'reason': 'Editado pelo médico',
        });
      } else {
        // Item da clínica: cria modificação
        await _api.modifyContentForPatient(widget.patientId, {
          'baseContentId': item['id'],
          'customTitle': result['title'],
          'customDescription': result['description'],
          'reason': 'Modificado pelo médico',
        });
      }

      await _loadData();

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Item atualizado com sucesso!'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao atualizar: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}

// DESABILITAR/REMOVER/REATIVAR
Future<void> _toggleContent(Map<String, dynamic> item) async {
  try {
    if (item['isExclusive'] == true) {
      // Item exclusivo: confirmar e remover permanentemente
      final confirm = await showDialog<bool>(
        context: context,
        builder: (ctx) => AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: const Text('Remover item?'),
          content: const Text(
            'Este item exclusivo será removido permanentemente.',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () => Navigator.pop(ctx, true),
              style: TextButton.styleFrom(foregroundColor: Colors.red),
              child: const Text('Remover'),
            ),
          ],
        ),
      );

      if (confirm == true) {
        await _api.removePatientAdjustment(
          widget.patientId,
          item['id']?.toString() ?? '',
        );
      }
    } else if (item['isDisabled'] == true) {
      // Item desabilitado: reativar removendo o ajuste
      final adjustment = item['adjustment'];
      if (adjustment != null) {
        await _api.removePatientAdjustment(
          widget.patientId,
          adjustment['id']?.toString() ?? '',
        );
      }
    } else {
      // Item ativo: desabilitar
      await _api.disableContentForPatient(widget.patientId, {
        'baseContentId': item['id'],
        'reason': 'Desabilitado pelo médico',
      });
    }

    await _loadData();
  } catch (e) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Erro: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
}
```

---

## Fluxo de Dados

### Diagrama de Sequência - Adicionar Item

```
┌─────────┐          ┌─────────────┐          ┌─────────┐          ┌──────────┐
│  User   │          │   Flutter   │          │  NestJS │          │ Postgres │
└────┬────┘          └──────┬──────┘          └────┬────┘          └────┬─────┘
     │                      │                      │                    │
     │  Tap "Adicionar"     │                      │                    │
     │─────────────────────>│                      │                    │
     │                      │                      │                    │
     │  Show Dialog         │                      │                    │
     │<─────────────────────│                      │                    │
     │                      │                      │                    │
     │  Fill form + Submit  │                      │                    │
     │─────────────────────>│                      │                    │
     │                      │                      │                    │
     │                      │  POST /adjustments   │                    │
     │                      │─────────────────────>│                    │
     │                      │                      │                    │
     │                      │                      │  INSERT            │
     │                      │                      │───────────────────>│
     │                      │                      │                    │
     │                      │                      │  OK                │
     │                      │                      │<───────────────────│
     │                      │                      │                    │
     │                      │  201 Created         │                    │
     │                      │<─────────────────────│                    │
     │                      │                      │                    │
     │                      │  await _loadData()   │                    │
     │                      │─────────────────────>│                    │
     │                      │                      │  SELECT            │
     │                      │                      │───────────────────>│
     │                      │                      │                    │
     │                      │  Updated list        │                    │
     │                      │<─────────────────────│                    │
     │                      │                      │                    │
     │  Show SnackBar       │                      │                    │
     │<─────────────────────│                      │                    │
     │                      │                      │                    │
     │  Update UI           │                      │                    │
     │<─────────────────────│                      │                    │
     │                      │                      │                    │
```

---

## Estados dos Itens

### Indicadores Visuais

| Estado | Badge | Cor da Borda | Espessura | Ações |
|--------|-------|--------------|-----------|-------|
| Normal | - | Cinza (#C8C2B4) | 1px | Editar, Desabilitar |
| Exclusivo | "Exclusivo" (Azul) | Azul | 2px | Editar, Remover |
| Modificado | "Modificado" (Laranja) | Laranja | 2px | Editar, Desabilitar |
| Desabilitado | "Desabilitado" (Vermelho) | Cinza (#E5E7EB) | 1px | Reativar |

### Código do Badge

```dart
Widget _buildBadge(String label, Color color) {
  return Container(
    margin: const EdgeInsets.only(left: 4),
    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
    decoration: BoxDecoration(
      color: color.withAlpha(26), // 10% opacity
      borderRadius: BorderRadius.circular(4),
    ),
    child: Text(
      label,
      style: TextStyle(
        fontSize: 10,
        fontFamily: 'Inter',
        fontWeight: FontWeight.w500,
        color: color,
      ),
    ),
  );
}
```

---

## Tratamento de Erros

### Backend (NestJS)

```typescript
// Filtro global de exceções
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
```

### Frontend (Flutter)

```dart
// Tratamento centralizado de erros
try {
  await _api.addContentForPatient(patientId, data);
  await _loadData();

  if (mounted) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Sucesso!'),
        backgroundColor: Colors.green,
      ),
    );
  }
} on DioException catch (e) {
  if (mounted) {
    final error = _api.mapDioError(e);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(error.message),
        backgroundColor: Colors.red,
      ),
    );
  }
} catch (e) {
  if (mounted) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Erro inesperado: $e'),
        backgroundColor: Colors.red,
      ),
    );
  }
}
```

---

## Segurança

### Autenticação

- JWT Token com expiração de 24h
- Refresh Token com expiração de 7 dias
- Token armazenado em `SecureStorage` (Flutter)

### Autorização

```typescript
// Guards no NestJS
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DOCTOR')
```

### Validação de Propriedade

```typescript
// Verifica se o paciente pertence à clínica do usuário
async validatePatientBelongsToClinic(
  patientId: string,
  clinicId: string,
): Promise<boolean> {
  const patient = await this.prisma.user.findFirst({
    where: {
      id: patientId,
      clinicId,
      role: 'PATIENT',
    },
  });
  return !!patient;
}
```

---

## Performance

### Otimizações Implementadas

1. **Carregamento Paralelo**
```dart
final results = await Future.wait([
  _api.getClinicContentByType(type: 'TYPE'),
  _api.getPatientAdjustments(patientId, type: 'TYPE'),
]);
```

2. **Índices no Banco**
```prisma
@@index([clinicId, type])
@@index([patientId, customType])
```

3. **Verificação `mounted`**
```dart
if (mounted) {
  setState(() { ... });
}
```

---

## Testes

### Testes de Unidade (Backend)

```typescript
describe('PatientAdjustmentsService', () => {
  it('should add exclusive content', async () => {
    const result = await service.addContent(patientId, {
      customType: 'SYMPTOMS',
      customCategory: 'NORMAL',
      customTitle: 'Test',
    }, userId);

    expect(result.adjustmentType).toBe('ADD');
    expect(result.patientId).toBe(patientId);
  });

  it('should modify existing content', async () => {
    const result = await service.modifyContent(patientId, {
      baseContentId: contentId,
      customTitle: 'Modified',
    }, userId);

    expect(result.adjustmentType).toBe('MODIFY');
  });
});
```

### Testes de Widget (Flutter)

```dart
testWidgets('should show loading indicator', (tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: ClinicSymptomsScreen(),
    ),
  );

  expect(find.byType(CircularProgressIndicator), findsOneWidget);
});

testWidgets('should add content on button tap', (tester) async {
  // Mock API
  when(mockApi.addContentForPatient(any, any))
      .thenAnswer((_) async => {});

  await tester.pumpWidget(/* ... */);
  await tester.tap(find.text('Adicionar em Normais'));
  await tester.pumpAndSettle();

  verify(mockApi.addContentForPatient(any, any)).called(1);
});
```

---

## Checklist de Implementação

### Backend
- [x] Schema Prisma com modelos ClinicContent e PatientContentAdjustment
- [x] CRUD endpoints para ajustes de paciente
- [x] Validação de DTOs com class-validator
- [x] Guards de autenticação e autorização
- [x] Tratamento de erros centralizado

### Frontend
- [x] 8 telas de gestão de conteúdo padronizadas
- [x] PatientSelectorWidget reutilizável
- [x] Modal com TabController
- [x] Persistência correta com `await _loadData()`
- [x] Verificações `mounted` em operações async
- [x] Feedback visual com SnackBars
- [x] Badges para estados dos itens
- [x] Diálogos de confirmação para remoção

---

## Próximos Passos

1. [ ] Implementar filtro por período (validFromDay/validUntilDay)
2. [ ] Adicionar busca/pesquisa dentro das listas
3. [ ] Implementar ordenação de itens (drag & drop)
4. [ ] Adicionar histórico de alterações (audit log)
5. [ ] Implementar bulk actions (selecionar múltiplos)
6. [ ] Adicionar export de dados (PDF/Excel)
7. [ ] Implementar notificações push para alterações
8. [ ] Adicionar cache offline com Hive/Isar
