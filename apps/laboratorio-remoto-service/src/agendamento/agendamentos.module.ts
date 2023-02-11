import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experimento } from '../experimento/experimento.entity';
import { ExperimentosModule } from '../experimento/experimentos.module';
import { Agendamento } from './agendamento.entity';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';

@Module({
  imports: [
    ExperimentosModule,
    TypeOrmModule.forFeature([Agendamento]),
    TypeOrmModule.forFeature([Experimento]),
  ],
  providers: [AgendamentosService],
  controllers: [AgendamentosController],
})
export class AgendamentosModule {}
