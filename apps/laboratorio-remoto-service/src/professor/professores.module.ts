import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './professor.entity';
import { ProfessoresController } from './professores.controller';
import { ProfessoresService } from './professores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  providers: [ProfessoresService],
  controllers: [ProfessoresController],
  exports: [ProfessoresService],
})
export class ProfessoresModule {}
