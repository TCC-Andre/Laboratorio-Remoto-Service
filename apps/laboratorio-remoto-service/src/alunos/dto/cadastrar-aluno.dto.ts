import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Turma } from '../../turma/turma.entity';

export class CadastrarAluno {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  matricula: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  senha: string;

  @ApiProperty()
  @IsNotEmpty()
  turma: Turma[];
}
