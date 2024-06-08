import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "TRANSACAO" })
export class Transacao {
    @PrimaryGeneratedColumn()
    id_transacao: string;

    @Column()
    id_pessoa: string;

    @Column()
    data_transacao: Date;

    @Column()
    valor_transacao: number;
}