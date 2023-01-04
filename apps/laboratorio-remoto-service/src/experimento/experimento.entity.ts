import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Turma } from '../turma/turma.entity';

@Entity()
export class Experimento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  duracao: number;

  @Column()
  status: boolean;

  @Column()
  dataCadastro: string;

  @ManyToMany(() => Turma, (turma) => turma.experimentos, {
    // eager: true,
  })
  turma: Turma[];
}
