import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EditarTurma {
  @ApiProperty()
  @IsOptional()
  nome: string;

  @ApiProperty()
  @IsOptional()
  codigo: string;
}
