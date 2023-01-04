import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Turma } from '../../turma/turma.entity';

export class CadastrarExperimento {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duracao: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  turma: Turma;
}
