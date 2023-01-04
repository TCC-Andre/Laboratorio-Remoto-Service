import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Aluno } from '../../alunos/aluno.entity';

export class CadastrarAgendamento {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dataInicio: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dataFim: string;

  @ApiProperty()
  @IsNotEmpty()
  alunoId: Aluno;
}
