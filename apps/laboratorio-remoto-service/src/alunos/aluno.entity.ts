import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  Timestamp,
  OneToOne,
} from 'typeorm';
import { Turma } from '../turma/turma.entity';
import * as dayjs from 'dayjs';
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
    // eager: true,
  })
  turma: Turma[];

  @Column()
  dataCadastro: string;

  @OneToOne(() => Agendamento, (agendamento) => agendamento.aluno)
  agendamento: Agendamento;
}
