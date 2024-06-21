
import { Produto } from "src/produto/produto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ESTOQUE' })
export class Estoque {
    @PrimaryGeneratedColumn()
    id_estoque: string;

    @ManyToOne(() => Produto, produto => produto.estoques, { eager: true })
    @JoinColumn({ name: 'id_produto' }) // Define a coluna de junção no lado do estoque
    produto: Produto;
    @Column()
    quantidade: number;

    @Column()
    descricao: string;
}