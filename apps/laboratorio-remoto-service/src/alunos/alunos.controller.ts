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
import { CadastrarAluno } from './dto/cadastrar-aluno.dto';
import { Aluno } from './aluno.entity';
import { AlunosService } from './alunos.service';
import { ApiTags } from '@nestjs/swagger';
import { EditarAluno } from './dto/editar-aluno.dto';

@ApiTags('Alunos')
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  create(@Body() cadastrarAlunoDto: CadastrarAluno): Promise<Aluno> {
    return this.alunosService.create(cadastrarAlunoDto);
  }

  @Get()
  findAll(): Promise<Aluno[]> {
    return this.alunosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Aluno> {
    return this.alunosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() editarAlunoDto: EditarAluno,
  ) {
    return this.alunosService.update(id, editarAlunoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.alunosService.remove(id);
  }
}
