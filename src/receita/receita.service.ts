import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Receita } from "./receita.entity";


@Injectable()
export class ReceitaService {
    constructor(@InjectRepository(Receita) private readonly ReceitaRepository: Repository<Receita>) {
    }

    async create(dto: Receita) {
        const receita = this.ReceitaRepository.create(dto);
        return await this.ReceitaRepository.save(receita);
    }

    async getReceita(where? : any) {
        const receitas = await this.ReceitaRepository.findBy(where);
        return receitas;
    }
}