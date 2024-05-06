import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Produto } from "./produto.entity";

@Injectable()
export class ProdutoService {
    constructor(@InjectRepository(Produto) private readonly estoqueRepository: Repository<Produto>) {
    }

    async create(dto: Produto) {
        const produto = this.estoqueRepository.create(dto);
        return await this.estoqueRepository.save(produto);
    }
}