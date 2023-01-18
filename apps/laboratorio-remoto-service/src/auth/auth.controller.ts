import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/auth-login-usuario.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() usuarioLogin: LoginUsuarioDto) {
    return this.authService.validaUsuario(
      usuarioLogin.matricula,
      usuarioLogin.senha,
    );
  }
}
