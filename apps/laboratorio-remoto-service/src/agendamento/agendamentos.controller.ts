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
import { ListarHorariosDisponiveisAgendamento } from './dto/listar-horarios-disponiveis-agendamento.dto';
import dayjs from 'dayjs';
import { consultarExisteAgendamento } from './dto/existe-agendamento.dto';

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

  @Post('/horarios-disponiveis')
  async listarHorariosDisponiveisAgendamento(
    @Body() horariosDisponiveis: ListarHorariosDisponiveisAgendamento,
  ): Promise<dayjs.Dayjs[]> {
    return await this.agendamentosService.listarHorariosDisponiveis(
      horariosDisponiveis,
    );
  }

  @Post('/existe-agendamento')
  async consultarExisteAgendamento(
    @Body() existeAgendamento: consultarExisteAgendamento,
  ): Promise<Agendamento | string> {
    return this.agendamentosService.consultarExisteAgendamento(
      existeAgendamento,
    );
  }
}
