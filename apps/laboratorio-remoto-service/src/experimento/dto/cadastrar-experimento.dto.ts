import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Turma } from '../../turma/turma.entity';

export class CadastrarExperimento {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty()
  @IsNotEmpty()
  duracao: number;

  @ApiProperty()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  // @IsOptional()
  turma: string;

  @ApiProperty()
  @IsOptional()
  imagem: string;

  @ApiProperty()
  @IsOptional()
  iframe: string;
}
