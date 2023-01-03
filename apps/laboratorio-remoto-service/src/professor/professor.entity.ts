import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
