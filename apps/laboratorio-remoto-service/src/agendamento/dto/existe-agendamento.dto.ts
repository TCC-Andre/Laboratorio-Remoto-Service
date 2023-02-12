import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class consultarExisteAgendamento {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  data: Date;

  @ApiProperty()
  @IsNotEmpty()
  experimentoId: string;
}
