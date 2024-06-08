import { Produto } from "src/produto/produto.entity";
import { Receita } from "src/receita/receita.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PRODUTOS-RECEITA" })
export class ProdutosReceita {

    @PrimaryColumn()
    id_produto: string;

    @PrimaryColumn()
    id_receita: string;

    @ManyToOne(() => Receita, receita => receita.produtosReceita)
    @JoinColumn({ name: 'id_receita' })
    
    receita: Receita;

    @ManyToOne(() => Produto, produto => produto.produtosReceita)
    @JoinColumn({ name: 'id_produto' })
    
    produto: Produto;

    @Column()
    quantidade: number;

    @Column()
    sequencia: number;
}