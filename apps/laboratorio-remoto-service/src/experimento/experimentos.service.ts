import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastrarExperimento } from './dto/cadastrar-experimento.dto';
import { Experimento } from './experimento.entity';
import * as dayjs from 'dayjs';
import { EditarExperimento } from './dto/editar-experimento.dto';
import { Turma } from '../turma/turma.entity';

@Injectable()
export class ExperimentosService {
  constructor(
    @InjectRepository(Experimento)
    private readonly experimentosRepository: Repository<Experimento>,
  ) {}

  async create(
    cadastrarExperimentoDto: CadastrarExperimento,
    file: any,
  ): Promise<Experimento> {
    const experimento = new Experimento();
    experimento.nome = cadastrarExperimentoDto.nome;
    experimento.descricao = cadastrarExperimentoDto.descricao;
    experimento.duracao = cadastrarExperimentoDto.duracao;
    experimento.status = cadastrarExperimentoDto.status;
    experimento.dataCadastro = dayjs().format();
    experimento.turma = JSON.parse(cadastrarExperimentoDto.turma);
    experimento.image = file.buffer;

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

  async update(
    id: string,
    editarExperimentoDto: EditarExperimento,
  ): Promise<Experimento> {
    const experimento = await this.experimentosRepository.findOneBy({ id: id });

    experimento.nome = editarExperimentoDto.nome;
    experimento.descricao = editarExperimentoDto.descricao;
    experimento.duracao = editarExperimentoDto.duracao;
    experimento.status = editarExperimentoDto.status;

    return this.experimentosRepository.save(experimento);
  }
}
