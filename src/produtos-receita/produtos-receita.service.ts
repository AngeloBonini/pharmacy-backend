import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProdutosReceita } from "./produtos-receita.entity";

@Injectable()
export class ProdutosReceitaService {
    constructor(@InjectRepository(ProdutosReceita) private readonly produtosReceitaRepository: Repository<ProdutosReceita>) {
    }

    async create(dto: ProdutosReceita) {
        const produtoReceita = this.produtosReceitaRepository.create(dto);
        return await this.produtosReceitaRepository.save(produtoReceita);
    }

    async getProduct(where? : any) {
        const produtosReceitas = await this.produtosReceitaRepository.findBy(where);
        return produtosReceitas;
    }
}