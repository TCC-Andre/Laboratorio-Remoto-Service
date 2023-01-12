import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Aluno } from '../alunos/aluno.entity';
import { Experimento } from '../experimento/experimento.entity';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'timestamp' })
  dataInicio: Date | string;

  // @Column()
  // dataFim: string;

  @Column({ type: 'timestamp' })
  dataCadastro: Date | string;

  @ManyToOne(() => Aluno, (aluno) => aluno.agendamento, {
    eager: true,
  })
  aluno: Aluno;

  @ManyToOne(() => Experimento, (experimento) => experimento.agendamento, {
    eager: true,
    // cascade: ['insert', 'update'],
  })
  experimento: Experimento;
}
