import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Turma } from '../turma/turma.entity';

@Entity()
export class Experimento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  duracao: number;

  @Column()
  status: boolean;

  @Column({ type: 'timestamp' })
  dataCadastro: Date | string;

  @ManyToMany(() => Turma, (turma) => turma.experimentos, {
    onDelete: 'CASCADE',
  })
  turma: Turma[];

  @OneToMany(() => Experimento, (experimento) => experimento.agendamento)
  agendamento: Turma;
}
