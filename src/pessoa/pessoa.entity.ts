import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'PESSOA' })
export class Pessoa {
    @PrimaryGeneratedColumn()
    id_pessoa: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    idade: number;

    @Column()
    cpf: string;

    @Column()
    cnpj: string;

    @Column()
    telefone: string;

    @Column()
    rua: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    cep: string;

    @Column()
    tipo: string;
}
