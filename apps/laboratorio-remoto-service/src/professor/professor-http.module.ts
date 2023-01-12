import { Module } from '@nestjs/common';
import { ProfessoresModule } from './professores.module';
import { ProfessoresService } from './professores.service';
import { ProfessoresController } from './professores.controller';

@Module({
  imports: [ProfessoresModule],
  providers: [ProfessoresService],
  controllers: [ProfessoresController],
})
export class ProfessorHttpModule {}
