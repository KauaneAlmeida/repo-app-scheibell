import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PatientsService } from './patients.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // Listar pacientes da clínica do usuário logado
  @Get()
  @Roles('CLINIC_ADMIN', 'CLINIC_STAFF')
  async findAll(
    @CurrentUser('clinicId') clinicId: string,
    @Query('search') search?: string,
    @Query('surgeryType') surgeryType?: string,
  ) {
    return this.patientsService.findAllByClinic(clinicId, { search, surgeryType });
  }

  // Buscar tipos de cirurgia únicos
  @Get('surgery-types')
  @Roles('CLINIC_ADMIN', 'CLINIC_STAFF')
  async getSurgeryTypes(@CurrentUser('clinicId') clinicId: string) {
    return this.patientsService.getSurgeryTypes(clinicId);
  }

  // Buscar paciente específico
  @Get(':id')
  @Roles('CLINIC_ADMIN', 'CLINIC_STAFF')
  async findOne(
    @Param('id') id: string,
    @CurrentUser('clinicId') clinicId: string,
  ) {
    const patient = await this.patientsService.findOne(id);

    // Validar que paciente pertence à clínica
    if (patient.clinicId !== clinicId) {
      throw new ForbiddenException('Paciente não pertence à sua clínica');
    }

    return patient;
  }

  // Criar novo paciente
  @Post()
  @Roles('CLINIC_ADMIN', 'CLINIC_STAFF')
  async create(
    @Body() dto: CreatePatientDto,
    @CurrentUser('clinicId') clinicId: string,
  ) {
    return this.patientsService.create(clinicId, dto);
  }

  // Atualizar paciente
  @Put(':id')
  @Roles('CLINIC_ADMIN', 'CLINIC_STAFF')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePatientDto,
    @CurrentUser('clinicId') clinicId: string,
  ) {
    // Validar que paciente pertence à clínica
    const patient = await this.patientsService.findOne(id);
    if (patient.clinicId !== clinicId) {
      throw new ForbiddenException('Paciente não pertence à sua clínica');
    }

    return this.patientsService.update(id, dto);
  }

  // Buscar estatísticas do paciente
  @Get(':id/stats')
  @Roles('CLINIC_ADMIN', 'CLINIC_STAFF')
  async getStats(
    @Param('id') id: string,
    @CurrentUser('clinicId') clinicId: string,
  ) {
    const patient = await this.patientsService.findOne(id);
    if (patient.clinicId !== clinicId) {
      throw new ForbiddenException('Paciente não pertence à sua clínica');
    }

    return this.patientsService.getPatientStats(id);
  }
}
