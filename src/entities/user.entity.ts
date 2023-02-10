import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password?: string;

  @Column({
    name: 'refresh_token',
    nullable: true
  })
  refreshToken: string;
}