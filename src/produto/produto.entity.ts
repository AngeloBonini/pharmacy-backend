import { Estoque } from "src/estoque/estoque.entity";
import { ProdutosReceita } from "src/produtos-receita/produtos-receita.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Estoque, estoque => estoque.produto)
    estoques: Estoque[];

    @OneToMany(() => ProdutosReceita, produtosReceita => produtosReceita.produto)
    produtosReceita: ProdutosReceita[];

}