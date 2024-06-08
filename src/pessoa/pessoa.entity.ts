import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'PESSOA' })
export class Pessoa {
    @PrimaryGeneratedColumn()
    id_pessoa: number;

    @Column()
    nome: string;

    @Column()
    password: string;

    @Column()
    idade: string;

    @Column()
    cpf: number;

    @Column()
    cnpj: number;

    @Column()
    telefone: string;

    @Column()
    rua: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    cep: number;

    @Column()
    tipo: string;
}
