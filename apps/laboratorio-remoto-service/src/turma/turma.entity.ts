import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Aluno } from '../alunos/aluno.entity';
import { Professor } from '../professor/professor.entity';

@Entity()
export class Turma {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  codigo: string;

  @ManyToOne(() => Professor, (professor) => professor.id, {
    eager: true,
    // cascade: ['insert', 'update'],
  })
  professor: Professor;

  @ManyToMany(() => Aluno, (aluno) => aluno.turma, {
    cascade: true,
    // eager: true,
  })
  @JoinTable()
  alunos: Aluno[];
}
