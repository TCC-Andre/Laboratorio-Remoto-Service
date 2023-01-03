import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastrarProfessor } from './dto/cadastrar-professor.dto';
import { Professor } from './professor.entity';

@Injectable()
export class ProfessoresService {
  constructor(
    @InjectRepository(Professor)
    private readonly professoresRepository: Repository<Professor>,
  ) {}

  async create(cadastrarProfessorDto: CadastrarProfessor): Promise<Professor> {
    const user = new Professor();
    user.nome = cadastrarProfessorDto.nome;
    user.matricula = cadastrarProfessorDto.matricula;
    user.email = cadastrarProfessorDto.email;
    user.senha = cadastrarProfessorDto.senha;

    const usuarioExistente = await this.professoresRepository.findOneBy({
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
      return this.professoresRepository.save(user);
    }
  }

  async findAll(): Promise<Professor[]> {
    return this.professoresRepository.find();
  }

  findOne(id: string): Promise<Professor> {
    return this.professoresRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.professoresRepository.delete(id);
  }
}
