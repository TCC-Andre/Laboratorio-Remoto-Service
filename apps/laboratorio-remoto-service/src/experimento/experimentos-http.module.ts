import { Module } from '@nestjs/common';
import { ExperimentosController } from './experimentos.controller';
import { ExperimentosModule } from './experimentos.module';
import { ExperimentosService } from './experimentos.service';

@Module({
  imports: [ExperimentosModule],
  providers: [ExperimentosService],
  controllers: [ExperimentosController],
})
export class UserHttpModule {}
