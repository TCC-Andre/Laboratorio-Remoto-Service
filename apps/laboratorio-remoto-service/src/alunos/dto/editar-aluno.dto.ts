import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EditarAluno {
  @ApiProperty()
  @IsOptional()
  nome: string;

  @ApiProperty()
  @IsOptional()
  matricula: string;

  @ApiProperty()
  @IsOptional()
  email: string;
}
