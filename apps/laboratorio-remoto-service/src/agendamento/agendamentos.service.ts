import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastrarAgendamento } from './dto/cadastrar-agendamento.dto';
import { Agendamento } from './agendamento.entity';
import * as dayjs from 'dayjs';
import { ListarHorariosDisponiveisAgendamento } from './dto/listar-horarios-disponiveis-agendamento.dto';
import { arredondarIntervaloHora } from '../utils/utils';

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

    // Arredondando para o próximo horário disponível
    const dataAtual = arredondarIntervaloHora(
      dayjs(cadastrarAgendamentoDto.dataInicio).add(-1, 'minute').toDate(),
    );

    agendamento.dataInicio = dayjs(dataAtual).format('YYYY-MM-DD HH:mm');

    console.log(agendamento.dataInicio);
    agendamento.dataCadastro = dayjs().format();
    agendamento.aluno = cadastrarAgendamentoDto.alunoId;
    agendamento.experimento = cadastrarAgendamentoDto.experimentoId;

    const agendamentoExistente = await this.agendamentosRepository.findOneBy({
      dataInicio: agendamento.dataInicio,
    });

    if (agendamentoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Já existe um agendamento para esta data/horário.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dayjs().isAfter(dayjs(agendamento.dataInicio, 'day'))) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'A data de inicio é inferior a atual.',
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

  async listarHorariosDisponiveis(
    listarHorariosDisponiveis: ListarHorariosDisponiveisAgendamento,
  ): Promise<dayjs.Dayjs[]> {
    if (
      dayjs()
        .add(-2, 'minute')
        .isAfter(dayjs(listarHorariosDisponiveis.data, 'day'))
    ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'A data de inicio é inferior a atual.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Consultar no banco os horários ocupados de determinado experimento
    const temp = await this.agendamentosRepository
      .createQueryBuilder('my_entity')
      .where('DATE(dataInicio) = DATE(:date)', {
        date: dayjs(listarHorariosDisponiveis.data).format('YYYY-MM-DD HH:mm'),
      })
      .where('my_entity.experimentoId = :experimentoId', {
        experimentoId: listarHorariosDisponiveis.experimentoId,
      })
      .getMany();

    const horariosOcupados = temp.map((item) => {
      return dayjs(item.dataInicio).format('HH:mm');
    });

    const intervalo = [];

    // Arredondando para o próximo horário disponível
    let dataAtual = arredondarIntervaloHora(listarHorariosDisponiveis.data);

    const dataFinal = dayjs(listarHorariosDisponiveis.data)
      .endOf('day')
      .format('YYYY-MM-DD HH:mm');

    while (dayjs(dataAtual).isBefore(dataFinal)) {
      intervalo.push(dayjs(dataAtual).format('HH:mm'));
      dataAtual = dayjs(dataAtual).add(30, 'minute').format();
    }

    console.log(horariosOcupados);
    console.log(intervalo);

    const horariosDisponiveis = intervalo.filter(
      (item) => !horariosOcupados.includes(item),
    );

    return horariosDisponiveis;
  }
}
