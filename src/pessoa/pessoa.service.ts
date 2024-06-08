import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pessoa } from "./pessoa.entity";

@Injectable()
export class PessoaService {
    constructor(@InjectRepository(Pessoa) private readonly pessoaRepository: Repository<Pessoa>) { }

    async create(dto: Pessoa) {
        const pessoa = this.pessoaRepository.create(dto);
        return await this.pessoaRepository.save(pessoa);
    }

    async getPessoa(where? : any) {
        const produtosReceitas = await this.pessoaRepository.findBy(where);
        return produtosReceitas;
    }
}
