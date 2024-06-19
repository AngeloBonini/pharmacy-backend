import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pessoa } from "./pessoa.entity";
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class PessoaService {
    constructor(@InjectRepository(Pessoa) private readonly pessoaRepository: Repository<Pessoa>) { }

    async bcryptPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async create(dto: Pessoa) {

        const pessoaAlreadyExists = await this.pessoaRepository.findOne({ where: { email: dto.email } });

        if (!pessoaAlreadyExists) {
            dto.password = await this.bcryptPassword(dto.password);
            const pessoa = this.pessoaRepository.create(dto);
            return await this.pessoaRepository.save(pessoa);
        }
    }

    async findOne(where: any) {
        return await this.pessoaRepository.findOne({ where });
    }

    async getPessoa(where?: any) {
        const pessoas = await this.pessoaRepository.findBy(where);
        return pessoas;
    }

    async createFakeClients(count: number): Promise<Pessoa[]> {
        const pessoas: Pessoa[] = [];

        for (let i = 0; i < count; i++) {
            const pessoa = this.pessoaRepository.create({
                email: faker.internet.email(),
                password: await this.bcryptPassword(faker.internet.password()),
                idade: Math.floor(Math.random() * (60 - 20 + 1)) + 20,
                nome: faker.person.fullName(),
                cpf: cpf.generate(),
                cnpj: cnpj.generate(),
                telefone: faker.phone.number(),
                rua: faker.location.street(),
                bairro: faker.location.country(),
                cidade: faker.location.city(),
                cep: faker.location.zipCode(),
                tipo: 'Cliente'
            });
            pessoas.push(pessoa);
        };
        return this.pessoaRepository.save(pessoas);
    }

    async createFakePharmaceutics(count: number): Promise<Pessoa[]> {
        const pessoas: Pessoa[] = [];

        for (let i = 0; i < count; i++) {
            const passPerson = {
                password: faker.internet.password(),
                person: faker.person.fullName(),
                email: faker.internet.email()
            };
            console.log(passPerson);
            const pessoa = this.pessoaRepository.create({
                email: passPerson.email,
                password: await this.bcryptPassword(passPerson.password),
                idade: Math.floor(Math.random() * (60 - 20 + 1)) + 20,
                nome: passPerson.person,
                cpf: cpf.generate(),
                cnpj: cnpj.generate(),
                telefone: faker.phone.number(),
                rua: faker.location.street(),
                bairro: faker.location.country(),
                cidade: faker.location.city(),
                cep: faker.location.zipCode(),
                tipo: 'Farmaceutico'
            });
            pessoas.push(pessoa);
        };
        return this.pessoaRepository.save(pessoas);
    }

}
