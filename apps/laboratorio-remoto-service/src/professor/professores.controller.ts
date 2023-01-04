import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CadastrarProfessor } from './dto/cadastrar-professor.dto';
import { Professor } from './professor.entity';
import { ProfessoresService } from './professores.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Professores')
@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Post()
  create(
    @Body() cadastrarProfessorDto: CadastrarProfessor,
  ): Promise<Professor> {
    return this.professoresService.create(cadastrarProfessorDto);
  }

  @Get()
  findAll(): Promise<Professor[]> {
    return this.professoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Professor> {
    return this.professoresService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.professoresService.remove(id);
  }
}
