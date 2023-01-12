import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUsuarioDto {
  @ApiProperty()
  @IsNotEmpty()
  matricula: string;

  @ApiProperty()
  @IsNotEmpty()
  senha: string;
}
