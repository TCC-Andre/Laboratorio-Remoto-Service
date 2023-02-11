import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experimento } from './experimento.entity';
import { ExperimentosController } from './experimentos.controller';
import { ExperimentosService } from './experimentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Experimento])],
  providers: [ExperimentosService],
  controllers: [ExperimentosController],
  exports: [ExperimentosService],
})
export class ExperimentosModule {}
