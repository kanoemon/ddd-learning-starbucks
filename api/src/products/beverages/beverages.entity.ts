import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BeveragesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  explanation: string;

  @Column({ default: false })
  deleteFlg: boolean;
}
