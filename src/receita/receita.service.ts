import { ProdutosReceita } from './../produtos-receita/produtos-receita.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Receita } from "./receita.entity";

interface ReceitaDto {
    receita: Receita,
    produtosReceita: ProdutosReceita,
}
@Injectable()
export class ReceitaService {
    constructor(@InjectRepository(Receita) private readonly receitaRepository: Repository<Receita>,
        @InjectRepository(ProdutosReceita) private readonly produtosReceitaRepository: Repository<ProdutosReceita>) {
    }

    async create(dto: ReceitaDto) {
        const receita = this.receitaRepository.create(dto.receita);
        const produtosReceita = this.produtosReceitaRepository.create(dto.produtosReceita)
        const saveReceita = await this.receitaRepository.save(receita);
        const saveProdutosReceita = this.produtosReceitaRepository.save(produtosReceita);

        return {saveReceita, saveProdutosReceita}
    }

    async getReceita(where?: any) {
        const receitas = await this.receitaRepository.findBy(where);
        return receitas;
    }
}