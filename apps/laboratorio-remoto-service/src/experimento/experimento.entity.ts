import { Blob } from 'buffer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  Binary,
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

  @Column('longblob')
  imagem?: string;

  @Column()
  iframe?: string;

  @OneToMany(() => Experimento, (experimento) => experimento.agendamento)
  agendamento: Turma;
}
