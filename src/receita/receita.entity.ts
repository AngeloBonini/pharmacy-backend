import { ProdutosReceita } from "src/produtos-receita/produtos-receita.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "RECEITA" })
export class Receita {
    @PrimaryGeneratedColumn()
    id_receita: string;

    @Column()
    id_farmaceutico: string;

    @Column()
    data_emissao: Date;

    @OneToMany(() => ProdutosReceita, produtosReceita => produtosReceita.receita, {eager: true})
    produtosReceita: ProdutosReceita[];
}