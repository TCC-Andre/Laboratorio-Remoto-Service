import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
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
  @IsNumber()
  duracao: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  // @IsObject()
  @IsNotEmpty()
  turma: Turma[];
}
