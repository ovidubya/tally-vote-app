import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Vote } from "./Vote";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToOne((type) => Vote, {
    cascade: true,
  })
  @JoinColumn()
  vote: Vote;
}
