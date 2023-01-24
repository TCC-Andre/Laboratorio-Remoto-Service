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
import { CadastrarExperimento } from './dto/cadastrar-experimento.dto';
import { EditarExperimento } from './dto/editar-experimento.dto';
import { Experimento } from './experimento.entity';
import { ExperimentosService } from './experimentos.service';

@ApiTags('Experimentos')
@Controller('experimentos')
export class ExperimentosController {
  constructor(private readonly experimentosService: ExperimentosService) {}

  @Post()
  create(
    @Body() cadastrarExperimentoDto: CadastrarExperimento,
  ): Promise<Experimento> {
    return this.experimentosService.create(cadastrarExperimentoDto);
  }

  @Get()
  findAll(): Promise<Experimento[]> {
    return this.experimentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Experimento> {
    return this.experimentosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() editarExperimentoDto: EditarExperimento,
  ) {
    return this.experimentosService.update(id, editarExperimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.experimentosService.remove(id);
  }
}
