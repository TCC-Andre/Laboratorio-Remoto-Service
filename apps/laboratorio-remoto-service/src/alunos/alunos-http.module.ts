import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos.module';
import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';

@Module({
  imports: [AlunosModule],
  providers: [AlunosService],
  controllers: [AlunosController],
})
export class AlunoHttpModule {}
