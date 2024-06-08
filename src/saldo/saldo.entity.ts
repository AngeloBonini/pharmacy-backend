import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "SALDO"})
export class Saldo {
    @PrimaryGeneratedColumn()
    id_saldo: string;

    @Column()
    id_pessoa: string;7

    @Column()
    valor: number;

}