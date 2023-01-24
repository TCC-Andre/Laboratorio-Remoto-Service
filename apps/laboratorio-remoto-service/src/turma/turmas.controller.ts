import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CadastrarTurma } from './dto/cadastrar-turma.dto';
import { EditarTurma } from './dto/editar-turma.dto';
import { Turma } from './turma.entity';
import { TurmasService } from './turmas.service';

@ApiTags('Turmas')
@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Post()
  create(@Body() cadastrarTurmaDto: CadastrarTurma): Promise<Turma> {
    return this.turmasService.create(cadastrarTurmaDto);
  }

  @Get()
  findAll(): Promise<Turma[]> {
    return this.turmasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Turma> {
    return this.turmasService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() editarTurmaDto: EditarTurma,
  ) {
    return this.turmasService.update(id, editarTurmaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.turmasService.remove(id);
  }
}
