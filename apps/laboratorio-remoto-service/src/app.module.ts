import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamentosModule } from './agendamento/agendamentos.module';
import { AlunosModule } from './alunos/alunos.module';
import { ExperimentosModule } from './experimento/experimentos.module';
import { ProfessoresModule } from './professor/professores.module';
import { TurmasModule } from './turma/turmas.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      timezone: '-03:00',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AlunosModule,
    ProfessoresModule,
    TurmasModule,
    ExperimentosModule,
    AgendamentosModule,
    AuthModule,
  ],
})
export class AppModule {}
