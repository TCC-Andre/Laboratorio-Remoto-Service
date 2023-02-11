import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Aluno } from '../../alunos/aluno.entity';
import { Experimento } from '../../experimento/experimento.entity';

export class CadastrarAgendamento {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dataInicio: Date;

  @ApiProperty()
  @IsNotEmpty()
  alunoId: Aluno;

  @ApiProperty()
  @IsNotEmpty()
  experimentoId: Experimento;
}
