//auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfessoresService } from '../professor/professores.service';
import * as bcrypt from 'bcrypt';
import { AlunosService } from '../alunos/alunos.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly professoresService: ProfessoresService,
    private readonly alunoService: AlunosService,
    private jwtService: JwtService,
  ) {}
  async validaUsuario(matricula: string, senha: string): Promise<any> {
    const user = await this.professoresService.findOneMatricula(matricula);
    const user2 = await this.alunoService.findOneMatricula(matricula);

    if (user) {
      const isMatch = await bcrypt.compare(senha, user.senha);
      if (isMatch) {
        return await this.gerarToken(user, true);
      } else {
        throw new UnauthorizedException('Usuário ou senha inválidos');
      }
    }

    if (user2) {
      const isMatch = await bcrypt.compare(senha, user2.senha);
      if (isMatch) {
        return await this.gerarToken(user2, false);
      } else {
        throw new UnauthorizedException('Usuário ou senha inválidos');
      }
    }

    throw new UnauthorizedException('Usuário ou senha inválidos');
  }

  async gerarToken(payload: any, isAdmin?: boolean) {
    return {
      access_token: this.jwtService.sign(
        { matricula: payload.matricula, isAdmin: isAdmin },
        {
          secret: 'topSecret512',
          expiresIn: '50s',
        },
      ),
      isAdmin: isAdmin,
      id: payload.id,
    };
  }
}
