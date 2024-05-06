import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Estoque } from "./estoque.entity";

@Injectable()
export class EstoqueService {
    constructor(@InjectRepository(Estoque) private readonly estoqueRepository: Repository<Estoque>) {
    }

    async create(dto: Estoque) {
        const estoque = this.estoqueRepository.create(dto);
        return await this.estoqueRepository.save(estoque);
    }
}