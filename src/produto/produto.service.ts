import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Produto } from "./produto.entity";

@Injectable()
export class ProdutoService {
    constructor(@InjectRepository(Produto) private readonly produtoRepository: Repository<Produto>) {
    }

    async create(dto: Produto) {
        const produto = this.produtoRepository.create(dto);
        return await this.produtoRepository.save(produto);
    }
}