import { ProdutosReceitaService } from './../produtos-receita/produtos-receita.service';
import { ProdutosReceita } from './../produtos-receita/produtos-receita.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Receita } from "./receita.entity";

interface ReceitaDto {
    receita: Receita,
    produtosReceitas: ProdutosReceita[],
}
@Injectable()
export class ReceitaService {
    constructor(@InjectRepository(Receita) private readonly receitaRepository: Repository<Receita>,
        @InjectRepository(ProdutosReceita) private readonly produtosReceitaService: ProdutosReceitaService) {
    }

    async create(dto: ReceitaDto) {
        const receita = this.receitaRepository.create(dto.receita);

        const produtosReceitasCreateds = [] as ProdutosReceita[]
        for (const produtoReceita of dto.produtosReceitas) {
            produtoReceita.id_receita = receita.id_receita;
            produtoReceita.receita = receita;
            const produtosReceitaCreated = await this.produtosReceitaService.create(produtoReceita);
            produtosReceitasCreateds.push(produtosReceitaCreated);
        }

        const saveReceita = await this.receitaRepository.save(receita);

        return { saveReceita, produtosReceitasCreateds }
    }

    async getReceita(where?: any) {
        const receitas = await this.receitaRepository.findBy(where);
        return receitas;
    }

    async updateReceita(set: any, where: any) {
        return await this.receitaRepository.update(where, set);
    }

    async deleteReceita(where: any) {
        return await this.receitaRepository.delete(where);
    }
}