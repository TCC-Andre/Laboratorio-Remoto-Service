import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class consultarExisteAgendamento {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  data: string;

  @ApiProperty()
  @IsNotEmpty()
  experimentoId: string;

  @ApiProperty()
  @IsNotEmpty()
  alunoId: string;
}
