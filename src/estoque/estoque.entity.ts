
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ESTOQUE' })
export class Estoque {
    @PrimaryGeneratedColumn()
    id_estoque: string;

    @Column({ unique: true, foreignKeyConstraintName: "FK_PRODUTO_ESTOQUE", })
    id_produto: string;

    @Column()
    quantidade: number;

    @Column()
    localizacao: string;
}