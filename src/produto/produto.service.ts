import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Produto } from "./produto.entity";
import { faker } from "@faker-js/faker";

@Injectable()
export class ProdutoService {
    constructor(@InjectRepository(Produto) private readonly produtoRepository: Repository<Produto>) {
    }

    async create(dto: Produto) {
        const produto = this.produtoRepository.create(dto);
        return await this.produtoRepository.save(produto);
    }

    async getProduct(where?: any) {
        const produtos = await this.produtoRepository.findBy(where);
        return produtos;
    }

    async createMedicines(): Promise<Produto[]> {
        const produtos: Produto[] = [];

        const medicines = [
            { nome: 'Paracetamol', descricao: "Antitérmico/Analgésico/Anti-inflamatorio", controlado: false, preco: 5.59 },
            { nome: 'Ibuprofeno', descricao: "Antitérmico/Analgésico", controlado: false, preco: 12.59 },
            { nome: 'Amoxicilina', descricao: "Antibiotico/Anti-inflamatorio", controlado: false, preco: 12.59 },
            { nome: 'Simvastatina', descricao: "Colesterol", controlado: true, preco: 20.59 },
            { nome: 'Aspirina', descricao: "Antitérmico/Analgésico/Anti-inflamatorio", controlado: false, preco: 5.59 },
            { nome: 'Metformina', descricao: "Diabetes", controlado: true, preco: 5.00 },
            { nome: 'Omeprazol', descricao: "Dor de estomago", controlado: true, preco: 5.00 },
        ];
        const existsProduto = await this.produtoRepository.findBy({});
        if(!existsProduto[0]) {
            for (const medicine of medicines) {
                const produto = this.produtoRepository.create(
                    medicine
                );
                produtos.push(produto);
            }
            return await this.produtoRepository.save(produtos);
        }
    }
}