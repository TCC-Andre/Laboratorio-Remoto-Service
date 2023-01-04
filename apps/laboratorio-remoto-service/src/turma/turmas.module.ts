import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from './turma.entity';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turma])],
  providers: [TurmasService],
  controllers: [TurmasController],
})
export class TurmasModule {}
