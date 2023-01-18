import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  providers: [AlunosService],
  controllers: [AlunosController],
  exports: [AlunosService],
})
export class AlunosModule {}
