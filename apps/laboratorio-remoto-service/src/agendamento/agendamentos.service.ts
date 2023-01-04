import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastrarAgendamento } from './dto/cadastrar-agendamento.dto';
import { Agendamento } from './agendamento.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class AgendamentosService {
  constructor(
    @InjectRepository(Agendamento)
    private readonly agendamentosRepository: Repository<Agendamento>,
  ) {}

  async create(
    cadastrarAgendamentoDto: CadastrarAgendamento,
  ): Promise<Agendamento> {
    const agendamento = new Agendamento();
    agendamento.dataInicio = cadastrarAgendamentoDto.dataInicio;
    agendamento.dataFim = cadastrarAgendamentoDto.dataFim;
    agendamento.dataCadastro = dayjs().format();
    agendamento.aluno = cadastrarAgendamentoDto.alunoId;

    const usuarioExistente = await this.agendamentosRepository.findOneBy({
      dataInicio: agendamento.dataInicio,
    });

    if (usuarioExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Turma já cadastrada!',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.agendamentosRepository.save(agendamento);
    }
  }

  async findAll(): Promise<Agendamento[]> {
    return this.agendamentosRepository.find();
  }

  findOne(id: string): Promise<Agendamento> {
    return this.agendamentosRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.agendamentosRepository.delete(id);
  }
}
