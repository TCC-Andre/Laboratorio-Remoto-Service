import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Turma } from '../turma/turma.entity';

@Entity()
export class Professor {
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

  @Column({ type: 'timestamp' })
  dataCadastro: Date | string;

  @OneToMany(() => Turma, (turma) => turma.professor)
  user: Turma;
}
