import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Aluno } from '../../alunos/aluno.entity';
import { Professor } from '../../professor/professor.entity';

export class CadastrarTurma {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty()
  @IsNotEmpty()
  professorId: Professor;

  @ApiProperty()
  @IsOptional()
  alunos: Aluno[];
}
