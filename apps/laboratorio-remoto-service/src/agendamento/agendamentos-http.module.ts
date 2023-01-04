import { Module } from '@nestjs/common';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosModule } from './agendamentos.module';
import { AgendamentosService } from './agendamentos.service';

@Module({
  imports: [AgendamentosModule],
  providers: [AgendamentosService],
  controllers: [AgendamentosController],
})
export class UserHttpModule {}
