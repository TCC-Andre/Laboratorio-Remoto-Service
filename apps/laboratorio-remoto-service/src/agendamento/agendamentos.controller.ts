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
import { CadastrarAgendamento } from './dto/cadastrar-agendamento.dto';
import { Agendamento } from './agendamento.entity';
import { AgendamentosService } from './agendamentos.service';

@ApiTags('Agendamentos')
@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  create(
    @Body() cadastrarAgendamentoDto: CadastrarAgendamento,
  ): Promise<Agendamento> {
    return this.agendamentosService.create(cadastrarAgendamentoDto);
  }

  @Get()
  findAll(): Promise<Agendamento[]> {
    return this.agendamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Agendamento> {
    return this.agendamentosService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.agendamentosService.remove(id);
  }
}
