import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Turma } from '../turma/turma.entity';
import { Agendamento } from '../agendamento/agendamento.entity';
@Entity()
export class Aluno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  matricula: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @ManyToMany(() => Turma, (turma) => turma.alunos, {
    eager: true,
  })
  turma: Turma[];

  @Column({ type: 'timestamp' })
  dataCadastro: Date | string;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.aluno)
  agendamento: Agendamento;
}
