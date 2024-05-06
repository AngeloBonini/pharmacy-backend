import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ESTOQUE' })
export class Estoque {
    @PrimaryGeneratedColumn()
    id_estoque: number;

    @Column()
    id_produto: number;

    @Column()
    quantidade: number;

    @Column()
    localizacao: string;


}