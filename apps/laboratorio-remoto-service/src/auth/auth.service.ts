//auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfessoresService } from '../professor/professores.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly professoresService: ProfessoresService,
    private jwtService: JwtService,
  ) {}
  async validarUsuario(matricula: string, senha: string): Promise<any> {
    const user = await this.professoresService.findOneMatricula(matricula);
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    if (isMatch) {
      return await this.gerarToken(user);
    }
    throw new UnauthorizedException('Usuário ou senha inválidos');
  }

  async gerarToken(payload: any) {
    return {
      access_token: this.jwtService.sign(
        { matricula: payload.matricula },
        {
          secret: 'topSecret512',
          expiresIn: '50s',
        },
      ),
    };
  }
}
