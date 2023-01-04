import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastrarAluno } from './dto/cadastrar-aluno.dto';
import { Aluno } from './aluno.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunosRepository: Repository<Aluno>,
  ) {}

  async create(cadastrarAlunoDto: CadastrarAluno): Promise<Aluno> {
    const user = new Aluno();
    user.nome = cadastrarAlunoDto.nome;
    user.matricula = cadastrarAlunoDto.matricula;
    user.email = cadastrarAlunoDto.email;
    user.senha = cadastrarAlunoDto.senha;
    user.turma = cadastrarAlunoDto.turma;
    user.dataCadastro = dayjs().format();

    const usuarioExistente = await this.alunosRepository.findOneBy({
      matricula: user.matricula,
    });

    if (usuarioExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Matricula já cadastrada!',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.alunosRepository.save(user);
    }
  }

  async findAll(): Promise<Aluno[]> {
    return this.alunosRepository.find();
  }

  findOne(id: string): Promise<Aluno> {
    return this.alunosRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.alunosRepository.delete(id);
  }
}
