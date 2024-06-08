import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PRODUTOS-RECEITA" })
export class ProdutosReceita {
    @Column()
    id_receita: string;

    @Column()
    id_produto: string;
}