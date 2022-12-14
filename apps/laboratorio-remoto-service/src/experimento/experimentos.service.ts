import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastrarExperimento } from './dto/cadastrar-experimento.dto';
import { Experimento } from './experimento.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class ExperimentosService {
  constructor(
    @InjectRepository(Experimento)
    private readonly experimentosRepository: Repository<Experimento>,
  ) {}

  async create(
    cadastrarExperimentoDto: CadastrarExperimento,
  ): Promise<Experimento> {
    const experimento = new Experimento();
    experimento.nome = cadastrarExperimentoDto.nome;
    experimento.descricao = cadastrarExperimentoDto.descricao;
    experimento.duracao = cadastrarExperimentoDto.duracao;
    experimento.status = cadastrarExperimentoDto.status;
    experimento.dataCadastro = dayjs().format();
    experimento.turma = cadastrarExperimentoDto.turma;

    const usuarioExistente = await this.experimentosRepository.findOneBy({
      nome: experimento.nome,
    });

    if (usuarioExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Experimento já cadastrado!',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.experimentosRepository.save(experimento);
    }
  }

  async findAll(): Promise<Experimento[]> {
    return this.experimentosRepository.find();
  }

  findOne(id: string): Promise<Experimento> {
    return this.experimentosRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.experimentosRepository.delete(id);
  }
}
