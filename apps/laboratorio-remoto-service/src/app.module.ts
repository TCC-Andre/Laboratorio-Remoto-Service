import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessoresModule } from './professor/professores.module';
import { TurmasModule } from './turma/turmas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AlunosModule,
    ProfessoresModule,
    TurmasModule,
  ],
})
export class AppModule {}
