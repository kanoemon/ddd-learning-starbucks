import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Beverages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  explanation: string;

  @Column()
  deleteFlg: boolean;
}

export default Beverages;
