import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EditarExperimento {
  @ApiProperty()
  @IsOptional()
  nome: string;

  @ApiProperty()
  @IsOptional()
  descricao: string;

  @ApiProperty()
  @IsOptional()
  duracao: number;

  @ApiProperty()
  @IsOptional()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  imagem: string;

  @ApiProperty()
  @IsOptional()
  iframe: string;
}
