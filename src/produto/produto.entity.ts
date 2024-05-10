import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'PRODUTO' })
export class Produto {
    @PrimaryGeneratedColumn()
    id_produto: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    controlado: boolean;

    @Column()
    preco: number;

    @Column()
    quantidade: number;

}