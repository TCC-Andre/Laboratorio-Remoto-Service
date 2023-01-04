import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Turma } from '../turma/turma.entity';

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
}
