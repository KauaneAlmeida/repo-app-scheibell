import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  // Calcular dias pós-operatório
  private calculateDaysPostOp(surgeryDate: Date | null): number | null {
    if (!surgeryDate) return null;
    const today = new Date();
    const surgery = new Date(surgeryDate);
    const diffTime = today.getTime() - surgery.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : null;
  }

  // Listar pacientes da clínica
  async findAllByClinic(
    clinicId: string,
    filters: { search?: string; surgeryType?: string },
  ) {
    const where: any = { clinicId };

    if (filters.search) {
      where.user = {
        OR: [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { email: { contains: filters.search, mode: 'insensitive' } },
        ],
      };
    }

    if (filters.surgeryType) {
      where.surgeryType = filters.surgeryType;
    }

    const patients = await this.prisma.patient.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Adicionar daysPostOp calculado
    const patientsWithStats = patients.map((patient) => ({
      id: patient.id,
      userId: patient.userId,
      name: patient.user.name,
      email: patient.user.email,
      phone: patient.phone,
      cpf: patient.cpf,
      birthDate: patient.birthDate,
      surgeryDate: patient.surgeryDate,
      surgeryType: patient.surgeryType,
      daysPostOp: this.calculateDaysPostOp(patient.surgeryDate),
      clinicId: patient.clinicId,
      createdAt: patient.createdAt,
    }));

    return {
      patients: patientsWithStats,
      total: patientsWithStats.length,
    };
  }

  // Buscar paciente por ID
  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
        contentAdjustments: {
          where: { isActive: true },
          include: {
            baseContent: true,
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }

    return {
      ...patient,
      name: patient.user.name,
      email: patient.user.email,
      daysPostOp: this.calculateDaysPostOp(patient.surgeryDate),
    };
  }

  // Criar paciente
  async create(clinicId: string, dto: CreatePatientDto) {
    // Verificar se email já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Criar usuário e paciente em uma transação
    const result = await this.prisma.$transaction(async (tx) => {
      // Criar User
      const passwordHash = await bcrypt.hash(dto.password || '123456', 10);

      const user = await tx.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          passwordHash,
          role: 'PATIENT',
          clinicId,
        },
      });

      // Criar Patient
      const patient = await tx.patient.create({
        data: {
          userId: user.id,
          clinicId,
          cpf: dto.cpf,
          phone: dto.phone,
          birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
          surgeryDate: dto.surgeryDate ? new Date(dto.surgeryDate) : null,
          surgeryType: dto.surgeryType,
        },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      return patient;
    });

    return {
      ...result,
      name: result.user.name,
      email: result.user.email,
      daysPostOp: this.calculateDaysPostOp(result.surgeryDate),
    };
  }

  // Atualizar paciente
  async update(id: string, dto: UpdatePatientDto) {
    const patient = await this.prisma.patient.update({
      where: { id },
      data: {
        cpf: dto.cpf,
        phone: dto.phone,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
        surgeryDate: dto.surgeryDate ? new Date(dto.surgeryDate) : undefined,
        surgeryType: dto.surgeryType,
        user: dto.name
          ? {
              update: { name: dto.name },
            }
          : undefined,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return {
      ...patient,
      name: patient.user.name,
      email: patient.user.email,
      daysPostOp: this.calculateDaysPostOp(patient.surgeryDate),
    };
  }

  // Estatísticas do paciente
  async getPatientStats(patientId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        medicationLogs: {
          where: {
            takenAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
          },
        },
        appointments: {
          where: { status: 'COMPLETED' },
        },
        contentAdjustments: {
          where: { isActive: true },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const daysPostOp = this.calculateDaysPostOp(patient.surgeryDate);

    return {
      daysPostOp,
      medicationsTakenLast7Days: patient.medicationLogs.length,
      completedAppointments: patient.appointments.length,
      activeAdjustments: patient.contentAdjustments.length,
    };
  }

  // Buscar tipos de cirurgia únicos
  async getSurgeryTypes(clinicId: string) {
    const patients = await this.prisma.patient.findMany({
      where: { clinicId, surgeryType: { not: null } },
      select: { surgeryType: true },
      distinct: ['surgeryType'],
    });

    return patients.map((p) => p.surgeryType).filter(Boolean);
  }
}
