import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from './agendamento.entity';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamento])],
  providers: [AgendamentosService],
  controllers: [AgendamentosController],
})
export class AgendamentosModule {}
