import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Aluno } from '../alunos/aluno.entity';
import { Experimento } from '../experimento/experimento.entity';
import { Professor } from '../professor/professor.entity';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dataInicio: string;

  @Column()
  dataFim: string;

  @Column()
  dataCadastro: string;

  @OneToOne(() => Aluno, (aluno) => aluno.agendamento, {
    eager: true,
  })
  @JoinColumn()
  aluno: Aluno;

  // @ManyToOne(() => Professor, (professor) => professor.id, {
  //   eager: true,
  //   // cascade: ['insert', 'update'],
  // })
  // professor: Professor;

  // @ManyToMany(() => Aluno, (aluno) => aluno.turma, {
  //   cascade: true,
  //   // eager: true,
  // })
  // @JoinTable()
  // alunos: Aluno[];

  // @ManyToMany(() => Experimento, (experimento) => experimento.turma, {
  //   cascade: true,
  //   eager: true,
  // })
  // @JoinTable()
  // experimentos: Experimento[];
}
