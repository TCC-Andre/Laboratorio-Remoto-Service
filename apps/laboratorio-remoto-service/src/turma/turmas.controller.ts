import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CadastrarTurma } from './dto/cadastrar-turma.dto';
import { Turma } from './turma.entity';
import { TurmasService } from './turmas.service';

@ApiTags('Turmas')
@Controller('turmas')
export class TurmasController {
  constructor(private readonly professoresService: TurmasService) {}

  @Post()
  create(@Body() cadastrarAlunoDto: CadastrarTurma): Promise<Turma> {
    return this.professoresService.create(cadastrarAlunoDto);
  }

  @Get()
  findAll(): Promise<Turma[]> {
    return this.professoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Turma> {
    return this.professoresService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.professoresService.remove(id);
  }
}
