import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transacao } from "./transacao.entity";

interface TrasacaoDto {
    id_pessoa: string;
    data_transacao: Date;
    valor_transacao: number;
}

@Injectable()
export class TransacaoService {
    constructor(@InjectRepository(Transacao) private readonly TransacaoRepository: Repository<Transacao>) {
    }

    async create(dto: TrasacaoDto) {
        const transacao = this.TransacaoRepository.create(dto);
        return await this.TransacaoRepository.save(transacao);
    }

    async getTransacao(where?: any) {
        const receitas = await this.TransacaoRepository.findBy(where);
        return receitas;
    }
}