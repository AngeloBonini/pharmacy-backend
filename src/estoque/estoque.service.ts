import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Estoque } from "./estoque.entity";
import { Produto } from "src/produto/produto.entity";
import { ProdutoService } from "src/produto/produto.service";

@Injectable()
export class EstoqueService {
    constructor(@InjectRepository(Estoque) private readonly estoqueRepository: Repository<Estoque>,
    private produtoService: ProdutoService  // Injetando ProdutoService
    ) {
    }

    async create(dto: Estoque) {
        const estoque = this.estoqueRepository.create(dto);
        return await this.estoqueRepository.save(estoque);
    }

    async getEstoque(where?: any) {
        const estoques = await this.estoqueRepository.findBy(where);
        return estoques;
    }

    async createFakeStocks(): Promise<Estoque[]> {
        const estoques: Estoque[] = [];
        const produtos = await this.produtoService.getProduct({});

        for (const produto of produtos) {
            const estoque = this.estoqueRepository.create({
                localizacao: "BANCADA: " + (Math.floor(Math.random() * (5 - 1 + 5)) + 1) + " ,PRATELEIRA: " + (Math.floor(Math.random() * (5 - 1 + 5)) + 1),
                produto: produto,
                quantidade: Math.floor(Math.random() * (5 - 1 + 5)) + 1,
            });
            estoques.push(estoque);
        };
        return this.estoqueRepository.save(estoques);
    }
}