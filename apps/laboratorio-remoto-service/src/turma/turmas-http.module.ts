import { Module } from '@nestjs/common';
import { TurmasController } from './turmas.controller';
import { TurmasModule } from './turmas.module';
import { TurmasService } from './turmas.service';

@Module({
  imports: [TurmasModule],
  providers: [TurmasService],
  controllers: [TurmasController],
})
export class UserHttpModule {}
