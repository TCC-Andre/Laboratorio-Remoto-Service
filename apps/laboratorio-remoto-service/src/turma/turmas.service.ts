import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastrarTurma } from './dto/cadastrar-turma.dto';
import { Turma } from './turma.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class TurmasService {
  constructor(
    @InjectRepository(Turma)
    private readonly turmasRepository: Repository<Turma>,
  ) {}

  async create(cadastrarTurmaDto: CadastrarTurma): Promise<Turma> {
    const turma = new Turma();
    turma.codigo = cadastrarTurmaDto.codigo;
    turma.nome = cadastrarTurmaDto.nome;
    turma.professor = cadastrarTurmaDto.professorId;
    turma.alunos = cadastrarTurmaDto.alunos;
    turma.dataCadastro = dayjs().format();

    const usuarioExistente = await this.turmasRepository.findOneBy({
      codigo: turma.codigo,
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
      return this.turmasRepository.save(turma);
    }
  }

  async findAll(): Promise<Turma[]> {
    return this.turmasRepository.find();
  }

  findOne(id: string): Promise<Turma> {
    return this.turmasRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.turmasRepository.delete(id);
  }
}
