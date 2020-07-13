import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  repo: string;

  @Column()
  name: string;
}
