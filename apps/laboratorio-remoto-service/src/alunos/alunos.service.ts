import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastrarAluno } from './dto/cadastrar-aluno.dto';
import { Aluno } from './aluno.entity';
import * as dayjs from 'dayjs';
import * as bcrypt from 'bcrypt';
import { EditarAluno } from './dto/editar-aluno.dto';
const saltRounds = 10;
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
    const hash = await bcrypt.hash(cadastrarAlunoDto.senha, saltRounds);
    user.senha = hash;
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

  async findOneMatricula(matricula: string): Promise<Aluno | undefined> {
    return this.alunosRepository.findOneBy({ matricula: matricula });
  }

  async update(id: string, editarAlunoDto: EditarAluno): Promise<Aluno> {
    const user = await this.alunosRepository.findOneBy({ id: id });

    user.nome = editarAlunoDto.nome;
    user.matricula = editarAlunoDto.matricula;
    user.email = editarAlunoDto.email;

    return this.alunosRepository.save(user);
  }
}
