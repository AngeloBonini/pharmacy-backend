import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "RECEITA" })
export class Receita {
    @PrimaryGeneratedColumn()
    id_receita: string;

    @Column()
    id_cliente: string;

    @Column()
    data_emissao: Date;
}